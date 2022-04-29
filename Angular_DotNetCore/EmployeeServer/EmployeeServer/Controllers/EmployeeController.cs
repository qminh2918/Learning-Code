using EmployeeServer.Context;
using EmployeeServer.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        readonly EmployeeContext EmpDetails;
        public EmployeeController(EmployeeContext employeeContext)
        {
            EmpDetails = employeeContext;
        }

        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            var data = EmpDetails.Employee.ToList();
            return data;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Employee obj)
        {
            var data = EmpDetails.Employee.Add(obj);
            EmpDetails.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Employee obj)
        {
            var data = EmpDetails.Employee.Update(obj);
            EmpDetails.SaveChanges();
            return Ok();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var data = EmpDetails.Employee.Where(a => a.EmpId == id).FirstOrDefault();
            EmpDetails.Employee.Remove(data);
            EmpDetails.SaveChanges();
            return Ok();

        }
    }
}
