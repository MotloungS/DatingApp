using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseAPIController
    {
        private readonly DataContext _cxt;
        public ITokenService _itokenService { get; }

        public AccountController(DataContext cxt,ITokenService itokenService){
            _itokenService = itokenService;
            _cxt = cxt;

        }

// jj
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){
                if(await UserExist(registerDto.Username)) return BadRequest("Username is taken");
                using var hmac= new HMACSHA512();
                var user=new AppUser{
                    UserName=registerDto.Username.ToLower(),
                    PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                    PasswordSalt= hmac.Key
                };
                _cxt.Users.Add(user);
                await _cxt.SaveChangesAsync();
                return  new UserDto{
                    Username=user.UserName,
                    Token=_itokenService.CreateToken(user)
                };
            
        }
        private async Task<bool> UserExist(string username){

            return await _cxt.Users.AnyAsync(x=>x.UserName== username.ToLower());
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto login){
                var user= await _cxt.Users.SingleOrDefaultAsync(x=>x.UserName==login.Username);
       if(user==null) return Unauthorized("Invalid Username");
       
       using var hmac = new HMACSHA512(user.PasswordSalt);
       var computedHash= hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));
        for(int i=0;i<computedHash.Length;i++){
            if (computedHash[i]!=user.PasswordHash[i]) return Unauthorized("Invalid password");
           
        }
          return  new UserDto{
                    Username=user.UserName,
                    Token=_itokenService.CreateToken(user)
                };
        }
    }
}