using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PUSGS_PR_162_2020.DTO.OrderDTO;
using PUSGS_PR_162_2020.DTO.OrderDTO.OrderHelper;
using PUSGS_PR_162_2020.Interfaces;
using System.Data;

namespace PUSGS_PR_162_2020.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public IActionResult GetAllOrders([FromQuery] OrderHelper orderHelper) {
            return Ok(_orderService.GetAllOrders(orderHelper));
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderById(long id)
        {
            OrderResponseDTO order;

            try
            {
                order = _orderService.GetOrderById(id);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }

            return Ok(order);
        }

        [HttpPost]
        [Authorize(Roles = "Buyer")]
        public IActionResult CreateOrder([FromBody] OrderRequestDTO requestDto)
        {
            long userId = long.Parse(User.Claims.FirstOrDefault(x => x.Type == "Id").Value);
            OrderResponseDTO order;

            try
            {
                order = _orderService.CreateOrder(requestDto, userId);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }

            return Ok(order);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Buyer")]
        public IActionResult DeleteOrder(long id)
        {
            long userId = long.Parse(User.Claims.FirstOrDefault(x => x.Type == "Id").Value);
            DeleteResponseDTO responseDto;

            try
            {
                responseDto = _orderService.CancelOrder(id, userId);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }

            return Ok(responseDto);
        }
    }
}
