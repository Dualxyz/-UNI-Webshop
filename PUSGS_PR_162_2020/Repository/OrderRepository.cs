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

        public List<Order> GetOrderBySellerId(long id)
        {
            return _context.Orders.Where(x => x.Article.SellerId == id).ToList();
        }

        public Order? GetOrderById(long id)
        {
            return _context.Orders.Find(id);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public bool AddOrder(Order order)
        {
            try
            {
                _context.Orders.Add(order);
                return true;
            } catch (Exception ex) {
                throw new Exception(ex.Message);
            }
        }

        public Article? GetArticle(long id)
        {
            return _context.Articles.Find(id);
        }

        public Order? RemoveOrder(Order order)
        {
            var entityEntry = _context.Orders.Remove(order);

            // Check if the entity was found and removed
            if (entityEntry.State == EntityState.Deleted)
            {
                return entityEntry.Entity; // This will be the removed Order entity
            }

            return null; // Return null if the entity was not found or not removed
        }
    }
}
