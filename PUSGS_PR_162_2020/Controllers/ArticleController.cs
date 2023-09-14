using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PUSGS_PR_162_2020.Interfaces;

namespace PUSGS_PR_162_2020.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;
        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }
    }
}
