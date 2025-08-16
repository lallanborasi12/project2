import React from "react";

const MainPaymentPlan = ({ data, setbilledText, setbilledPrice, setbilledCredits, setbilledDiscount, setPlanIndexId, setPlanId, showModal, currency_symbols, billedCredits, planIndexId }) => {
    return (<div className="plnwdth-wrap">



        {data ? (
            data.sort((a, b) => a.planOrd - b.planOrd).map((rows, index) => (
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
                            <div id={index === 1 ? "rate-a" : ""}
                                className={rows.isTrue === true ? "rate-lists rate-a tab active" : 'rate-lists rate-a tab'}
                                onClick={() => {
                                    setbilledText(rows.name);
                                    setbilledPrice(rows.price);
                                    setbilledCredits(rows.credits);
                                    setbilledDiscount(
                                        (
                                            ((rows.price - rows.credits) * 100) /
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
                                    <p className="prcmnth"><span style={{ color: "#bdbcbc", textDecoration: "line-through", fontWeight: 200 }}> {currency_symbols[rows.country]}{rows.price}</span>  {currency_symbols[rows.country]}{rows.credits}
                                        {" "}

                                        <span className={index === 1 ? "pink-dis-badge" : "hideClass"}> {" "}
                                            {(
                                                ((rows.price - rows.credits) *
                                                    100) /
                                                rows.price
                                            ).toFixed(0) + "% off"}{" "}
                                        </span>
                                    </p>

                                    {/* valueAdded code */}
                                    <div >
                                        <ul className="value-added">
                                            {
                                                rows.valueAdded.map((li_index, va_row) => (
                                                    <div key={va_row}>
                                                        {rows.valueAdded[va_row] != "" ? (
                                                            <li >{rows.valueAdded[va_row]}</li>
                                                        ) : (
                                                            <></>
                                                        )}

                                                    </div>
                                                ))
                                            }
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
                                                    fontSize: "11px",
                                                    display: "block",
                                                    paddingTop: ".4rem"
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
            ))
        ) : (
            <span>Sorry! No plan available now.</span>
        )}



        <div className='sp11'>
            <div className=' necxbutton1 necxbuttontex' onClick={() => showModal(planIndexId)}
                href={void 0}>Buy Now →</div>
        </div>
        <div className='finalte sp11'>Please note that your subscription will be automatically renewed at the price of {billedCredits} at the end of the chosen subscription term. If you don't want to be billed, you may cancel your subscription via ketobalanced.com</div>


    </div>);
}

export default React.memo(MainPaymentPlan);