const FooterBottom = () => {
  return (
    <div className="footer__bottom">
      <div className="footer-bottom__copyright">
        © 2025 цитаты-джейсона-стейтема.рф
        <br />
        Данный проект носит исключительно юмористический характер
      </div>
      <div className="footer-bottom__social">
        <div className="footer-social__telegram">
          <a href="t.me" className="tg-link">
            <i className="fa-brands fa-telegram"></i>
          </a>
        </div>
        <div className="footer-social__github">
          <a href="github.com" className="gh-link">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
