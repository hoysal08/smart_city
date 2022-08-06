// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract PolutionCertificate is ERC721URIStorage {

  using Strings for uint256;
  using Counters for Counters.Counter;    
  Counters.Counter private _tokenid;

  address private _owner;
   mapping(address=>bool) private AuthorisedAddresses;
   address[] private AuthorisedAddressesarr;

struct CerfInfo{
  string VehicleNo;
  string Typeofvehicle;
  string FuelType;
  string VehicleModel;
  uint Rating;
  string Ownername;
  uint CertifiedAt;
  uint ValidTill;
  bool Valid;
}

    mapping(uint256 => CerfInfo)public tokenidtoCerf;
    mapping(string=>uint256) public vehiclenototokenid;

    constructor() ERC721("Pollution Certificate", "POL_CERF"){
               _owner = msg.sender;
              AuthorisedAddressesarr.push(msg.sender);
               AuthorisedAddresses[msg.sender]=true;
    }
     
    
    function generateCertificate(uint256 tokenId) internal  returns(string memory){
        bytes memory svg =abi.encodePacked(
           '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350" style="border:5px solid gold">',
   '<style>.base {  font-family: serif;  }</style>',
  '<rect width="100%" height="100%" fill="#FFFBFA" />',
   '<text x="50%" y="10%" class="base" fill="#0C1673" dominant-baseline="middle" text-anchor="middle" font-weight="bold" font-size="16px">Pollution undercontrol certificate</text>',
   '<text x="50%" y="25%" class="base" dominant-baseline="middle" text-anchor="middle" font-size="8px" font-weight="bold">',"Vehicle Number: ",getVehicleNo(tokenId),'</text>',
   '<text x="50%" y="32%" class="base" dominant-baseline="middle" text-anchor="middle" font-size="8px" font-weight="bold">',"Type of Vehicle: ",getTypeofvehicle(tokenId),'</text>',
   '<text x="50%" y="39%" class="base" dominant-baseline="middle" text-anchor="middle" font-size="8px" font-weight="bold">', "Fuel Type: ",getFuelType(tokenId),'</text>',
   '<text x="50%" y="46%" class="base" dominant-baseline="middle" text-anchor="middle" font-size="8px" font-weight="bold">', "Vehicle Model: ",getVehicleModel(tokenId),'</text>',
    '<text x="50%" y="53%" class="base" dominant-baseline="middle" text-anchor="middle" font-size="8px" font-weight="bold">', "Vehicle Rating: ",getRating(tokenId),'</text>',
    '<text x="50%" y="60%" class="base" dominant-baseline="middle" text-anchor="middle" font-size="8px" font-weight="bold">', "Vehicle Owner: ",getOwnername(tokenId),'</text>',
     '<text x="50%" y="67%" class="base" dominant-baseline="middle" text-anchor="middle" font-size="8px" font-weight="bold">', "Certified At: ",getCertifiedAt(tokenId),'</text>',
'<text x="50%" y="74%" class="base" dominant-baseline="middle" text-anchor="middle" font-size="8px" font-weight="bold">', "Valid Till: ",getValidTill(tokenId),'</text>',
'<text x="50%" y="81%" class="base" dominredant-baseline="middle" text-anchor="middle" font-size="8px" font-weight="bold">', "Validity: ",getValidity(tokenId),'</text>',
 '</svg>'
        );

        return string(
            abi.encodePacked("data:image/svg+xml;base64,",
            Base64.encode(svg)
            )
        );
    }

    function getVehicleNo(uint256 tokenId) public view returns(string memory) {
       return tokenidtoCerf[tokenId].VehicleNo;
    }
    function getTypeofvehicle(uint256 tokenId) public view returns(string memory) {
        return tokenidtoCerf[tokenId].Typeofvehicle;
    }
     function getFuelType(uint256 tokenId) public view returns(string memory) {
       return tokenidtoCerf[tokenId].FuelType;
    }
    function getVehicleModel(uint256 tokenId) public view returns(string memory) {
       return tokenidtoCerf[tokenId].VehicleModel;
    }
      function getRating(uint256 tokenId) public view returns(string memory) {
       return tokenidtoCerf[tokenId].Rating.toString();
    }
    function getOwnername(uint256 tokenId) public view returns(string memory) {
       return tokenidtoCerf[tokenId].Ownername;
    }
    function getCertifiedAt(uint256 tokenId) public view returns(string memory) {
       uint256 timest=tokenidtoCerf[tokenId].CertifiedAt;
       uint256 year;
       uint256 month;
       uint256 day;
       (year,month,day)=timestampToDate(timest);
       string memory date;
       date=string.concat(day.toString(),"-");
       date=string.concat(date,month.toString());
       date=string.concat(date,"-");
       date=string.concat(date,year.toString());
       return date;
    }
    function getValidTill(uint256 tokenId) public view returns(string memory ) {

       uint256  timest= tokenidtoCerf[tokenId].ValidTill;
       uint256  year;
       uint256  month;
       uint256  day;
       (year,month,day)=timestampToDate(timest);
       string memory date;
       date=string.concat(day.toString(),"-");
       date=string.concat(date,month.toString());
       date=string.concat(date,"-");
       date=string.concat(date,year.toString());
       return date;
    }
    function getValidity(uint256 tokenId) public returns(string memory) {
           if(block.timestamp>tokenidtoCerf[tokenId].ValidTill)
           {
                 tokenidtoCerf[tokenId].Valid=false;
           }
           if(tokenidtoCerf[tokenId].Valid)
           {
               return "valid";
           }
           else
           {
               return "Invalid";
           }
    }
    
    function getTokenId(string memory _VehicleNo) public view returns (uint)
    {
           return vehiclenototokenid[_VehicleNo];
    }

    function getTokenURI(uint256 tokenId) public  returns (string memory){
    bytes memory dataURI = abi.encodePacked(
        '{',
            '"name": "Pollution under certificate #', tokenId.toString(), '",',
            '"description": "Details of validity of certificate ",',
            '"image": "', generateCertificate(tokenId), '"',
            ' "valid": "',getValidity(tokenId), '"' ,
        '}'
    );
    return string(
        abi.encodePacked(
            "data:application/json;base64,",
            Base64.encode(dataURI)
        )
    );
}

function getAuthorisedAddr() public view returns(address[] memory){
    return AuthorisedAddressesarr;
}
function setAuthorisedAddr(address _addr) public {
    require(AuthorisedAddresses[msg.sender],"only authorised users can add new users");
    AuthorisedAddressesarr.push(_addr);
    AuthorisedAddresses[_addr]=true;
}


 function mint( string memory _VehicleNo,
  string memory _Typeofvehicle,
  string memory _FuelType,
  string memory _VehicleModel,
  uint _Rating,
  string memory _Ownername) public{
          require(AuthorisedAddresses[msg.sender],"only authorised users can add Generate certificate");
       _tokenid.increment();
       uint256 newItemId=_tokenid.current();
       _safeMint(_owner,newItemId);
        vehiclenototokenid[_VehicleNo]=newItemId;
        tokenidtoCerf[newItemId].Typeofvehicle=_Typeofvehicle;
        tokenidtoCerf[newItemId].VehicleNo=_VehicleNo;
        tokenidtoCerf[newItemId].FuelType=_FuelType;
        tokenidtoCerf[newItemId].VehicleModel=_VehicleModel;
        tokenidtoCerf[newItemId].Rating=_Rating;
        tokenidtoCerf[newItemId].Ownername=_Ownername;
        tokenidtoCerf[newItemId].CertifiedAt= block.timestamp;
        tokenidtoCerf[newItemId].ValidTill= block.timestamp+180 days;
        tokenidtoCerf[newItemId].Valid=true;

       _setTokenURI(newItemId,getTokenURI(newItemId));

    }
    
    function renew(uint256 tokenId,uint _rating) public {
          require(AuthorisedAddresses[msg.sender],"only authorised users can add/modify  certificate");
        require(_exists(tokenId),"Please use an existing Token");
        require( block.timestamp<tokenidtoCerf[tokenId].ValidTill-15 days,"you can renew only with validity less than 15 days");
        tokenidtoCerf[tokenId].Rating=_rating;
        tokenidtoCerf[tokenId].CertifiedAt= block.timestamp;
        tokenidtoCerf[tokenId].ValidTill= block.timestamp+180 days;
        tokenidtoCerf[tokenId].Valid=true;

        _setTokenURI(tokenId,getTokenURI(tokenId));
    }
    

    //Timesstamp to date
    function _daysToDate(uint256 _days)
        internal
        pure
        returns (
            uint256 year,
            uint256 month,
            uint256 day
        )
    {
        int256 __days = int256(_days);
        int256  OFFSET19700101 = 2440588;
        int256 L = __days + 68569 + OFFSET19700101;
        int256 N = (4 * L) / 146097;
        L = L - (146097 * N + 3) / 4;
        int256 _year = (4000 * (L + 1)) / 1461001;
        L = L - (1461 * _year) / 4 + 31;
        int256 _month = (80 * L) / 2447;
        int256 _day = L - (2447 * _month) / 80;
        L = _month / 11;
        _month = _month + 2 - 12 * L;
        _year = 100 * (N - 49) + _year + L;

        year = uint256(_year);
        month = uint256(_month);
        day = uint256(_day);
    }

    function timestampToDate(uint256 timestamp)
        internal
        pure
        returns (
            uint256 year,
            uint256 month,
            uint256 day
        )
    {
                uint256  SECONDS_PER_DAY = 24 * 60 * 60;

        (year, month, day) = _daysToDate(timestamp / SECONDS_PER_DAY);
    }

}

//0xB4e5435E321c3766A6F0ccc2a6Ca263038E76278-mumbai

//final addr: 0x68b86fAacb8De8f6432Adb3735e50e74F0fD4ab5