using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PUSGS_PR_162_2020.DTO.AricleDTO;
using PUSGS_PR_162_2020.DTO.AricleDTO.ArticleHelper;
using PUSGS_PR_162_2020.DTO.OrderDTO;
using PUSGS_PR_162_2020.Interfaces;
using System.Data;

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

        [HttpGet]
        public IActionResult GetAllArticles([FromQuery] ArticleHelper articleHelper)
        {
            return Ok(_articleService.GetAllArticles(articleHelper));
        }

        [HttpGet("{id}")]
        public IActionResult GetArticleById(long id)
        {
            ArticleResponseDTO article;

            try
            {
                article = _articleService.GetArticleById(id);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
            return Ok(article);
        }

        [HttpPost]
        //[Authorize(Roles = "Seller", Policy = "IsVerifiedSeller")]
        public IActionResult CreateArticle([FromBody] ArticleRequestDTO requestDto)
        {
            //long userId = long.Parse(User.Claims.FirstOrDefault(x => x.Type == "Id").Value);
            long userId = 1;
            ArticleResponseDTO article;

            try
            {
                article = _articleService.CreateArticle(requestDto, userId);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(article);
        }

        [HttpPut("{id}")]
        //[Authorize(Roles = "Seller", Policy = "IsVerifiedSeller")]
        public IActionResult UpdateArticle(long id, [FromBody] ArticleRequestDTO requestDto)
        {
            //long userId = long.Parse(User.Claims.FirstOrDefault(x => x.Type == "Id").Value);
            long userId = 0;
            ArticleResponseDTO article;

            try
            {
                article = _articleService.UpdateArticle(id, requestDto, userId);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
           

            return Ok(article);
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles = "Seller", Policy = "IsVerifiedSeller")]
        public IActionResult DeleteArticle(long id)
        {
            //long userId = long.Parse(User.Claims.FirstOrDefault(x => x.Type == "Id").Value);
            long userId = 0;
            ArticleDeleteReponseDTO responseDto;

            try
            {
                responseDto = _articleService.DeleteArticle(id, userId);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }

            return Ok(responseDto);
        }
    }
}
