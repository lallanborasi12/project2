import React from "react";
import { Link } from "react-router-dom";

const DiscountedPlan = ({
  discountModal,
  discounted_pcr_before,
  discounted_pcr,
  common_icons,
  data,
  Dplandata,
  setbilledText,
  setbilledPrice,
  setbilledCredits,
  setbilledDiscount,
  setPlanIndexId,
  setPlanId,
  currency_symbols,
  showModal,
  planIndexId,
  common_icons_array,
  isVisible,
  scrollToTop,
}) => {
  return (
    <div id="dscntmodelinfo-wrap" className={discountModal}>
      <div className="dscntinfo-overlay bodly">
        <div className="dscntinfocnt-wrap">
          <div className="discntplan-wrap">
            {discounted_pcr_before != null && discounted_pcr != null ? (
              <div className="dscntwrap">
                <img
                  src={common_icons["gift_icon"]}
                  alt="Gift-icon"
                  width={50}
                  height={53}
                  loading="lazy"
                />
                <p>
                  Get a{" "}
                  <span
                    style={{ color: "#1590e0", textDecoration: "line-through" }}
                  >
                    {discounted_pcr_before}%{" "}
                  </span>
                  &nbsp;
                  <span style={{ color: "#FF3464" }}>{discounted_pcr}% </span>
                  discount on your keto diet plan
                </p>
              </div>
            ) : (
              <></>
            )}

            <div className="row">
              <h2 style={{ textAlign: "center", width: "100%" }}>
                Choose your plan{" "}
              </h2>
              <div className="plnwdth-wrap">
                <table>
                  <tbody>
                    <tr className="col-aling">
                      <td width="100%" id="mysubs">
                        {data ? (
                          Dplandata.sort((a, b) => a.planOrd - b.planOrd).map(
                            (rows, index) => (
                              <span key={index}>
                                {
                                  <>
                                    {index === 1 ? (
                                      <div className="mstpplr">
                                        <div className="offeres">
                                          {rows.isPlanRemark}
                                        </div>
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    <div
                                      id={index === 1 ? "rate-a" : ""}
                                      className={
                                        rows.isTrue === true
                                          ? "rate-lists rate-a tab active"
                                          : "rate-lists rate-a tab"
                                      }
                                      onClick={() => {
                                        setbilledText(rows.name);
                                        setbilledPrice(rows.price);
                                        setbilledCredits(rows.credits);
                                        setbilledDiscount(
                                          (
                                            ((rows.price - rows.credits) *
                                              100) /
                                            rows.price
                                          ).toFixed(0)
                                        );
                                        setPlanIndexId(index);
                                        setPlanId(rows.id);
                                        showModal(index);
                                      }}
                                      key={index}
                                    >
                                      <div className="check">
                                        <div className="ok-tick"></div>
                                      </div>

                                      <div className="dvcntmn">
                                        <div className="check-titl">
                                          {rows.name}
                                        </div>
                                        <p className="prcmnth">
                                          {" "}
                                          {currency_symbols[rows.country]}
                                          {rows.credits}{" "}
                                          <span
                                            className={
                                              index === 1
                                                ? "pink-dis-badge"
                                                : "hideClass"
                                            }
                                          >
                                            {" "}
                                            {discounted_pcr +
                                              "% extra off"}{" "}
                                          </span>
                                        </p>

                                        {/* valueAdded code */}
                                        <div>
                                          <ul className="value-added">
                                            {rows.valueAdded.map(
                                              (li_index, va_row) => (
                                                <div key={va_row}>
                                                  {rows.valueAdded[va_row] !=
                                                  "" ? (
                                                    <li>
                                                      {rows.valueAdded[va_row]}
                                                    </li>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </div>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="dvcntmn2">
                                        <div className="price-list single-month">
                                          <div>
                                            <span className="ratpng">
                                              {" "}
                                              {currency_symbols[rows.country]}
                                              {rows.pricePerWeek}
                                            </span>
                                            <span
                                              style={{
                                                fontSize: "13px",
                                                display: "block",
                                              }}
                                            >
                                              Per Week
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                }
                              </span>
                            )
                          )
                        ) : (
                          <span>Sorry! No plan available now.</span>
                        )}
                        <div id="sbsctn-btn btnvibrt">
                          <a
                            onClick={() => showModal(planIndexId)}
                            href={void 0}
                            className="main3 smooth-scroll bynw  text-white"
                          >
                            Buy Now →
                          </a>
                        </div>
                        <div className="finalte">
                          Please note that your subscription will be
                          automatically renewed at the price of chosen plan at
                          the end of the chosen subscription term. If you don't
                          want to be billed, you may cancel your subscription
                          via ketobalanced.com
                        </div>
                        <br />
                        <h5>
                          Guaranteed <span className="hltclr">Safe</span>{" "}
                          Checkout
                        </h5>
                        <div className="grntsec">
                          <img
                            src={common_icons_array["f1"]}
                            width={65}
                            height={33}
                            alt="loading"
                            loading="lazy"
                          />
                          <img
                            src={common_icons_array["f2"]}
                            width={65}
                            height={33}
                            alt="loading"
                            loading="lazy"
                          />
                          <img
                            src={common_icons_array["paypal_f"]}
                            width={65}
                            height={17}
                            alt="loading"
                            loading="lazy"
                          />
                          <img
                            src={common_icons_array["ssl"]}
                            width={65}
                            height={28}
                            alt="loading"
                            loading="lazy"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="wrapwidthsec">
            <h2 className="wtget">What you get</h2>
            <ul className="gtpntul">
              <li> Step-by-step keto dieting assistance</li>
              <li>
                {" "}
                Pre-calculated portion sizes based on your habits and
                preferences
              </li>
              <li>
                {" "}
                Easy-to-cook delicious recipes with step-by-step preparation
                guide
              </li>
              <li> High quality "How to cook" videos</li>
              <li> Weekly shopping list with all ingredients</li>
              <li> 100+ weight-loss insights</li>
              <li> Hydration and weight tracker</li>
              <li>
                {" "}
                Exclusive guides to help you understand more about nutrition and
                training to reach your goal
              </li>
            </ul>

            <h2>
              People who were able to meet goals like yours by following{" "}
              <span className="hltclr">our customised keto diet program</span>
            </h2>
            <br />
            <p className="imgtxt">
              <small>
                The displayed results are not representative and depend on
                various factors such as gender, age, physical condition,
                adherence to meal and workout plan, etc. This is not an offer or
                promise of results. Consult your physician to receive any
                particular recommendations on your specific health conditions.
              </small>
            </p>
            <h2 style={{ margin: "20px auto" }}>People Often Ask</h2>
            <div className="pask">
              <div className="qstnsecwrap">
                <div className="qstnimgsec">
                  <img
                    src={common_icons_array["qstn_icon"]}
                    width={24}
                    height={24}
                    alt="loading"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4>How is my plan created?</h4>
                  <p>
                    We use the answers you provided and our unique algorithms to
                    target your program specifically to your individual needs
                    and goals. Our programs are verified by the experts, so you
                    can rest assured that your program will work for you, as it
                    is designed for you only.
                  </p>
                </div>
              </div>
              <div className="qstnsecwrap">
                <div className="qstnimgsec">
                  <img
                    src={common_icons_array["qstn_icon"]}
                    width={24}
                    height={24}
                    alt="loading"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4>How do I see my program?</h4>
                  <p>
                    Every plan is personalized and our nutritionists along with
                    fitness experts work hard to make sure you will love them.
                    It normally takes a few hours to get access to your plan via
                    email.
                  </p>
                </div>
              </div>
              <div className="qstnsecwrap">
                <div className="qstnimgsec">
                  <img
                    src={common_icons_array["qstn_icon"]}
                    width={24}
                    height={24}
                    alt="loading"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4>Are there any device requirements?</h4>
                  <p>
                    To be able to access and use your plan, you need a
                    smartphone on the iOS (15.0 or later) or Android (8.0 or
                    later) operating system.
                  </p>
                </div>
              </div>
            </div>

            <h2 style={{ margin: "20px auto" }}>Users Love Our App</h2>
            <div className="instamnwrap">
              <div className="instainrwrap">
                <div className="instafrst">
                  <div className="emojisec">
                    <span role="img" aria-label="🥰" aria-hidden="false">
                      🥰
                    </span>
                    <p>@kicsicirpi</p>
                  </div>
                  <div className="instaicn">
                    <img
                      src={common_icons_array["insta"]}
                      width={24}
                      height={24}
                      alt="loading"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="instascnd">
                  <p>
                    I’m using your app, and I love it!! I’ve tried several home
                    training apps, but none was that easy to use and great. The
                    practices are various and nicely packed together.
                  </p>
                </div>
              </div>
              <div className="instainrwrap">
                <div className="instafrst">
                  <div className="emojisec">
                    <span role="img" aria-label="🤩" aria-hidden="false">
                      🤩
                    </span>
                    <p>@kimmi</p>
                  </div>
                  <div className="instaicn">
                    <img
                      src={common_icons_array["insta"]}
                      width={24}
                      height={24}
                      alt="loading"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="instascnd">
                  <p>
                    Wow! Your app has completely transformed my home workout
                    routine! I've struggled to stay consistent with other apps,
                    but yours has made it so much easier. The exercises are
                    engaging, and the way they're organized keeps me motivated.
                  </p>
                </div>
              </div>
              <div className="instainrwrap">
                <div className="instafrst">
                  <div className="emojisec">
                    <span role="img" aria-label="😎️" aria-hidden="false">
                      😎️
                    </span>
                    <p>@stella</p>
                  </div>
                  <div className="instaicn">
                    <img
                      src={common_icons_array["insta"]}
                      width={24}
                      height={24}
                      alt="loading"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="instascnd">
                  <p>
                    Just had to drop a message to say how much I'm loving your
                    app! It's like having a personal trainer in my pocket. The
                    instructional videos are clear, the workouts are effective,
                    and I love how I can track my progress over time. It's made
                    working out at home feel not only feasible but enjoyable.
                    Keep up the fantastic work!
                  </p>
                </div>
              </div>
            </div>
            <div className="mnybckwrap">
              <img
                src={common_icons_array["money_back"]}
                alt="money-back"
                height={"150px"}
                width={"150px"}
              />
              <div className="finalmoneybacktop">100% Money-Back Guarantee</div>
              <div className="tex">
                We believe that our plan can work for you and you will get
                visible results in 4 weeks! We are even willing to return your
                money if you don’t see visible results and can prove that you
                followed our plan. Please double-check our Refund Policy to
                understand all the requirements
              </div>
              <div className="finalmoneyback">
                <Link to={"/privacy-policy.html"} target="blank">
                  *Pursuant to Money-Back Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`fxdctabtm ${isVisible ? "show" : "hide"}`}>
        <div className="actions">
          <a
            style={{ color: "#fff", margin: "0px" }}
            onClick={scrollToTop}
            href={void 0}
            className={"active main3"}
          >
            Choose your plan{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DiscountedPlan);
