using Microsoft.EntityFrameworkCore;
using PUSGS_PR_162_2020.Infrastructure;
using PUSGS_PR_162_2020.Interfaces.RepoInterfaces;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Repository
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly APIDBContext _context;
        public ArticleRepository(APIDBContext context)
        {
            _context = context;
        }

        public bool AddArticle(Article article)
        {
            try
            {
                _context.Articles.Add(article);
                //this.Save();
                return true;
            } catch (Exception ex)
            {
                throw new Exception(ex.InnerException.Message);
            }

        }

        public List<Article> GetAll()
        {
            return _context.Articles.ToList();
        }

        public Article? GetArticleById(long id)
        {
            return _context.Articles.Find(id);
        }

        public List<Article> GetArticlesBySellerId(long sellerId)
        {
            return _context.Articles.Where(x => x.SellerId == sellerId).ToList();
        }

        public bool RemoveArticle(Article article)
        {
            try
            {
                _context.Articles.Remove(article);
                //this.Save();
                return true;
            } catch { throw new Exception("Unable to remove Article from DB"); }
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
