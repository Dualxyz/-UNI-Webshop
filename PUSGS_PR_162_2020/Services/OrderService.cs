using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PUSGS_PR_162_2020.DTO.OrderDTO;
using PUSGS_PR_162_2020.DTO.OrderDTO.OrderHelper;
using PUSGS_PR_162_2020.Interfaces;
using PUSGS_PR_162_2020.Interfaces.RepoInterfaces;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        private readonly IOrderRepository _orderRepository;
        public OrderService(IMapper mapper, IOrderRepository orderRepository) { 
            _mapper = mapper;
            _orderRepository = orderRepository;
        }
        public DeleteResponseDTO CancelOrder(long id, long userId)
        {
            throw new NotImplementedException();
        }

        public OrderResponseDTO CreateOrder(OrderRequestDTO requestDto, long userId)
        {
            throw new NotImplementedException();
        }

        public List<OrderResponseDTO> GetAllOrders(OrderHelper orderHelper)
        {
            List<Order> orders = new List<Order>();

            if(orderHelper.BuyerId > 0)
            {
                
            } else if (orderHelper.SellerId > 0)
            {
                //repo
                //for seller id, dopuni klasu.
            } else
            {
                //get orders from list
                orders = _orderRepository.GetAllOrders();
            }

            return _mapper.Map<List<OrderResponseDTO>>(orders);

        }

        public OrderResponseDTO GetOrderById(long id)
        {
            throw new NotImplementedException();
        }
    }
}
