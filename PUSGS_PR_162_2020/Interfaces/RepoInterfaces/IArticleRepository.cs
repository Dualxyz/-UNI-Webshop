using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Interfaces.RepoInterfaces
{
    public interface IArticleRepository
    {
        public List<Article> GetArticlesBySellerId(long sellerId);
        public List<Article> GetAll();
        public Article? GetArticleById(long id);
        public bool AddArticle(Article article);
        public void Save();
        public bool RemoveArticle(Article article);
    }
}
