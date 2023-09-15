using PUSGS_PR_162_2020.DTO.AricleDTO;
using PUSGS_PR_162_2020.DTO.AricleDTO.ArticleHelper;
using PUSGS_PR_162_2020.DTO.OrderDTO;

namespace PUSGS_PR_162_2020.Interfaces
{
    public interface IArticleService
    {
        List<ArticleResponseDTO> GetAllArticles(ArticleHelper articleHelper);
        ArticleResponseDTO GetArticleById(long id);
        ArticleResponseDTO CreateArticle(ArticleRequestDTO requestDto, long userId);
        ArticleResponseDTO UpdateArticle(long id, ArticleRequestDTO requestDto, long userId);
        ArticleDeleteReponseDTO DeleteArticle(long id, long userId);
    }
}
