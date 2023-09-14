using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PUSGS_PR_162_2020.DTO.OrderDTO.OrderHelper;
using PUSGS_PR_162_2020.Interfaces;

namespace PUSGS_PR_162_2020.Controllers
{
    [Route("api/[controller]")]
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
    }
}
