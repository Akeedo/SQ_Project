using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SQ_Project.Model;
using SQ_Project.Repository;
using System.Threading.Tasks;

namespace SQ_Project.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentRepository _repository;

        public DepartmentsController(IDepartmentRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetDepartments()
        {
            var departments = await _repository.GetDepartments();
            return Ok(departments);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            var department = await _repository.GetDepartment(id);

            if (department == null)
            {
                return NotFound();
            }

            return department;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Department>> AddDepartment([FromBody] Department department)
        {
            var newDepartment = await _repository.AddDepartment(department);
            return CreatedAtAction(nameof(GetDepartment), new { id = newDepartment.id }, newDepartment);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Department>> UpdateDepartment(int id, Department department)
        {
            if (id != department.id)
            {
                return BadRequest();
            }

            return await _repository.UpdateDepartment(department);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Department>> DeleteDepartment(int id)
        {
            var department = await _repository.DeleteDepartment(id);
            if (department == null)
            {
                return NotFound();
            }

            return department;
        }
    }
}
