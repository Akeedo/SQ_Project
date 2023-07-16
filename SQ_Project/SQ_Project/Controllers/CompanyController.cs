using Microsoft.AspNetCore.Mvc;
using SQ_Project.Model;
using SQ_Project.Repository;
using System.Collections.Generic;

namespace SQ_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyRepository _companyRepository;

        public CompaniesController(ICompanyRepository companyRepository)
        {
            _companyRepository = companyRepository;
        }

        // GET: api/Companies
        [HttpGet]
        public ActionResult<IEnumerable<Company>> GetAllCompanies()
        {
            return Ok(_companyRepository.GetAll());
        }

        // GET: api/Companies/5
        [HttpGet("{id}")]
        public ActionResult<Company> GetCompany(int id)
        {
            var company = _companyRepository.GetById(id);

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        // POST: api/Companies
        [HttpPost]
        public ActionResult<Company> AddCompany(Company company)
        {
            _companyRepository.Add(company);
            return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, company);
        }

        // PUT: api/Companies/5
        [HttpPut("{id}")]
        public IActionResult UpdateCompany(int id, Company company)
        {
            if (id != company.Id)
            {
                return BadRequest("The ID in the URL doesn't match the ID of the company object.");
            }

            _companyRepository.Update(company);
            return NoContent();
        }

        // DELETE: api/Companies/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCompany(int id)
        {
            _companyRepository.Delete(id);
            return NoContent();
        }
    }
}
