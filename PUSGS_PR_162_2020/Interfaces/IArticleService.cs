using PUSGS_PR_162_2020.DTO.AricleDTO;
using PUSGS_PR_162_2020.DTO.AricleDTO.ArticleHelper;
using PUSGS_PR_162_2020.DTO.OrderDTO;

namespace PUSGS_PR_162_2020.Interfaces
{
    public interface IArticleService
    {
        List<ArticleResponseDTO> GetAllArticles(ArticleHelper queryParameters);
        ArticleResponseDTO GetArticleById(long id);
        ArticleResponseDTO CreateArticle(ArticleResponseDTO requestDto, long userId);
        ArticleResponseDTO UpdateArticle(long id, ArticleResponseDTO requestDto, long userId);
        ArticleDeleteDTO DeleteArticle(long id, long userId);
    }
}
