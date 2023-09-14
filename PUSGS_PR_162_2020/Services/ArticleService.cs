using AutoMapper;
using PUSGS_PR_162_2020.DTO.AricleDTO;
using PUSGS_PR_162_2020.DTO.AricleDTO.ArticleHelper;
using PUSGS_PR_162_2020.Interfaces;
using PUSGS_PR_162_2020.Interfaces.RepoInterfaces;

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
        public ArticleResponseDTO CreateArticle(ArticleResponseDTO requestDto, long userId)
        {
            throw new NotImplementedException();
        }

        public ArticleDeleteDTO DeleteArticle(long id, long userId)
        {
            throw new NotImplementedException();
        }

        public List<ArticleResponseDTO> GetAllArticles(ArticleHelper queryParameters)
        {
            throw new NotImplementedException();
        }

        public ArticleResponseDTO GetArticleById(long id)
        {
            throw new NotImplementedException();
        }

        public ArticleResponseDTO UpdateArticle(long id, ArticleResponseDTO requestDto, long userId)
        {
            throw new NotImplementedException();
        }
    }
}
