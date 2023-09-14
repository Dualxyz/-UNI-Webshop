using Microsoft.EntityFrameworkCore;
using PUSGS_PR_162_2020.DTO.OrderDTO.OrderHelper;
using PUSGS_PR_162_2020.Infrastructure;
using PUSGS_PR_162_2020.Interfaces.RepoInterfaces;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly APIDBContext _context;

        public OrderRepository(APIDBContext context)
        {
            _context = context;
        }

        public List<Order> GetAllOrders()
        {
            return _context.Orders.ToList();
        }

        public List<Order> GetAllOrdersBuyer(OrderHelper helper)
        {
            return _context.Orders.Where(x => x.BuyerId == helper.BuyerId).ToList();
        }
    }
}
