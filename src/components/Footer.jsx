import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer_container">
        <div className="row">
          <div className="col-md-4 col-sm-12 my-2">
            <div className="footer_content">
              <h1 className="dancing">Contact Us</h1>
              <div className="contact_link_box">
                <li><a href=""><i className="bi bi-geo-alt-fill"></i>Tulsipur,Dang</a></li>
                <li><a href=""><i className="bi bi-telephone-outbound-fill"></i>+9779800000000</a></li>
                <li><a href=""><i className="bi bi-envelope"></i>screataurent@gmail.com</a></li>

              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 my-2">
            <div className="footer_content">
              <h1 className="dancing">Sc Restautent</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos beatae eligendi, nisi sequi mollitia perferendis labore a quia temporibus qui.</p>
              <div className="contact_social_link_box">
                <ul>
                  <li><a href=""><i className="bi bi-facebook text-primary"></i> </a></li>
                  <li><a href=""><i className="bi bi-twitter text-primary"></i> </a></li>
                  <li><a href=""><i className="bi bi-instagram text-danger"></i> </a></li>
                  <li><a href=""><i className="bi bi-tiktok text-danger"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 my-2">
            <div className="footer_content">
              <h1 className="dancing">Opening Hours</h1>
              <li>Every Day</li>
              <li>10 AM - 10 PM</li>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
