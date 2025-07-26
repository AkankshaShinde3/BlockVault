// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.2 <0.9.0;

contract Upload {

    struct Access
    {
        address user;
        bool access;
    }

    mapping(address=>string[]) value; //map of address and string here string will store the urls of allowed user to access photos
    mapping(address=>mapping(address=>bool)) ownership; //nested map to store the user-user access by storing value as true in 2D array if access is given
    mapping(address=>Access[]) accessList;
    mapping(address=>mapping (address=>bool)) previousData;

    function add(address _user, string memory url) external
    {
        value[_user].push(url);
    }

    function allow(address user) external
    {
        ownership[msg.sender][user]=true;
        if(previousData[msg.sender][user]==true)
        {
            for(uint i = 0; i<accessList[msg.sender].length; i++)
            {
                if(accessList[msg.sender][i].user==user)
                {
                    accessList[msg.sender][i].access=true;
                }
            }
        }
        else
        {
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user]=true;
        }
    }

    function disallow(address user) public
    {
        ownership[msg.sender][user]=false; //removes the ownership
        //also remove the access
        for(uint i = 0; i < accessList[msg.sender].length; i++)
        {
            if(accessList[msg.sender][i].user==user)
            {
                accessList[msg.sender][i].access=false;
            }
        }
    }

    function display(address _user) external view returns(string[] memory)
    {
        require(_user==msg.sender || ownership[_user][msg.sender], "You do not have access!"); //the message part is the error thrown it runs only if the condition in braces turns out to be false
        return value[_user];
    }

    function shareAccess() public view returns(Access[] memory)
    {
        return accessList[msg.sender];
    }

}