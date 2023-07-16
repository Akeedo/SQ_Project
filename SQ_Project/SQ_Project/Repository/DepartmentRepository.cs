using SQ_Project.Model;
using SQ_Project.Config;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SQ_Project.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly ApplicationDbContext _context;

        public DepartmentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Department>> GetDepartments()
        {
            return await _context.Departments.ToListAsync();
        }

        public async Task<Department> GetDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            return department;
        }

        public async Task<Department> AddDepartment(Department department)
        {
            var result = await _context.Departments.AddAsync(department);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Department> UpdateDepartment(Department department)
        {
            var result = _context.Departments.Update(department);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Department> DeleteDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department != null)
            {
                _context.Departments.Remove(department);
                await _context.SaveChangesAsync();
            }
            return department;
        }
    }
}
