using AutoMapper;
using EntityFramework.Exceptions.Common;
using Microsoft.EntityFrameworkCore;
using PUSGS_PR_162_2020.DTO.AricleDTO;
using PUSGS_PR_162_2020.DTO.AricleDTO.ArticleHelper;
using PUSGS_PR_162_2020.DTO.OrderDTO;
using PUSGS_PR_162_2020.Interfaces;
using PUSGS_PR_162_2020.Interfaces.RepoInterfaces;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Services
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IMapper _mapper;
        public ArticleService(IArticleRepository articleRepository, IMapper mapper)
        {
            _articleRepository = articleRepository;
            _mapper = mapper;
        }

        public ArticleResponseDTO CreateArticle(ArticleRequestDTO requestDto, long userId)
        {
            Article article = _mapper.Map<Article>(requestDto);
            article.SellerId = userId;

            //_dbContext.Articles.Add(article);
            

            try
            {
                _articleRepository.AddArticle(article);
                _articleRepository.Save();
            }
            catch (CannotInsertNullException)
            {
                throw new Exception("One of more fields are missing!");
            }

            return _mapper.Map<ArticleResponseDTO>(article);
        }

        public ArticleDeleteReponseDTO DeleteArticle(long id, long userId)
        {
            Article? article = _articleRepository.GetArticleById(id);

            if (article == null)
            {
                throw new Exception("Article with specified id doesn't exist!");
            }

            if (article.SellerId != userId)
            {
                throw new Exception("Sellers can only delete their own articles!");
            }

            try
            {
                _articleRepository.RemoveArticle(article);
            }
            catch (Exception e) 
            { 
                throw new Exception(e.Message);
            }

            return _mapper.Map<ArticleDeleteReponseDTO>(article);
        }

        public List<ArticleResponseDTO> GetAllArticles(ArticleHelper articleHelper)
        {
            List<Article> articles = new List<Article>();

            if (articleHelper.SellerId > 0)
            {
                articles = _articleRepository.GetArticlesBySellerId(articleHelper.SellerId);
            }
            else
            {
                articles = _articleRepository.GetAll();
            }

            return _mapper.Map<List<ArticleResponseDTO>>(articles);
        }

        public ArticleResponseDTO GetArticleById(long id)
        {
            ArticleResponseDTO article = _mapper.Map<ArticleResponseDTO>(_articleRepository.GetArticleById(id));

            if (article == null)
            {
                throw new Exception("Article with specified id doesn't exist!");
            }

            return article;
        }

        public ArticleResponseDTO UpdateArticle(long id, ArticleRequestDTO requestDto, long userId)
        {
            Article? article = _articleRepository.GetArticleById(id);

            if (article == null)
            {
                throw new Exception("Article with specified id doesn't exist!");
            }

            if (article.SellerId != userId)
            {
                throw new Exception("Sellers can only modify their own articles!");
            }

            _mapper.Map(requestDto, article);

            try
            {
                _articleRepository.Save();
            }
            catch (CannotInsertNullException)
            {
                throw new Exception("One of more fields are missing!");
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<ArticleResponseDTO>(article);
        }
    }
}
