using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
   
    public class UsersController :BaseAPIController
    {
        private readonly DataContext _cxt;
        public UsersController(DataContext cxt)
        {
            _cxt = cxt;

        }
        // kk
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUser(){
        
        return await _cxt.Users.ToListAsync();
        
    }
    //api/users/3
    [Authorize]
       [HttpGet("{id}")]
    public async Task<ActionResult<AppUser>> GetUser(int id ){
        
        return await _cxt.Users.FindAsync(id);
        
    }

    }
}