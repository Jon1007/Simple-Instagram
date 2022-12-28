import React from "react";
import { Link } from "react-router-dom";
import "./css/Not.css";

function Not(props) {
  return (
      <section className="page_404">
        <div className="containers">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h4 className="text-center ">No Photo</h4>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Look like you're lost</h3>
                  <Link to="/createpost" class="link_404">
                    Add Photo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Not;