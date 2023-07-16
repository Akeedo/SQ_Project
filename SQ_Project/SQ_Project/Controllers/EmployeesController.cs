using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SQ_Project.Model;
using SQ_Project.Repository;

namespace SQ_Project.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _repository;

        public EmployeesController(IEmployeeRepository repository)
        {
            _repository = repository;
        }
       
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await _repository.GetEmployees();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _repository.GetEmployee(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

 
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Employee>> AddEmployee([FromBody] Employee employee)
        {
            var newEmployee = await _repository.AddEmployee(employee);

             return CreatedAtAction(nameof(GetEmployee), new { id = newEmployee.id }, newEmployee);
           
        }

 
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Employee>> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.id)
            {
                return BadRequest();
            }

            return await _repository.UpdateEmployee(employee);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employee = await _repository.DeleteEmployee(id);
            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }
    }

}
