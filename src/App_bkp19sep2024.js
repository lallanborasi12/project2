import React, { Suspense, useEffect } from 'react';
import './keto.css'
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import NoPage from './components/pages/NoPage';
import HowFamiliar from './components/pages/HowFamiliar';
import BodyTypeTargetMix from './components/pages/BodyTypeTargetMix';
import Part1 from './components/pages/Part1';
import SocialProofMix from './components/pages/SocialProofMix';
import TargetZonesMix from './components/pages/TargetZonesMix';
import HappyWeight from './components/pages/HappyWeight';
import HowMuchTime from './components/pages/HowMuchTime';
import Part2 from './components/pages/Part2';
import Part3 from './components/pages/Part3';
import Part4 from './components/pages/Part4';
import Part5 from './components/pages/Part5';
import Part6 from './components/pages/Part6';
import Part7 from './components/pages/Part7';
import Motivation from './components/pages/Motivation';
import Part8 from './components/pages/Part8';
import WeightCurrent from './components/pages/WeightCurrent';
import WeightTarget from './components/pages/WeightTarget';
import Part9 from './components/pages/Part9';
import FeedbackSummary from './components/pages/FeedbackSummary';
import Occasion from './components/pages/Occasion';
import OccasionResult from './components/pages/OccasionResult';
import Result from './components/pages/Result';
import Email from './components/pages/Email';
import Final from './components/pages/Final';
import UserRegisterForm from './components/pages/UserRegisterForm';
import Head from './components/common/Head';

// import Home from './components/pages/Home';
// import Bk from './components/common/Bk';
// import General_condtions from "./components/generalpages/General_conditions";
// import Data_protection_policy from "./components/generalpages/Data_protection_policy";
// import Faq from "./components/generalpages/Faq";
// import Contact from "./components/generalpages/Contact";
// import Privacy_policy from "./components/generalpages/Privacy_policy";
// import Cookie_policy from "./components/generalpages/Cookie_policy";
// import Over40 from "./components/pages/Over40";
// import Men from "./components/pages/Men";
// import Women from "./components/pages/Women";

import Thankyou from "./components/offers/Thankyou";
import PayResponse from "./config/PayResponse";
import Loader from './components/common/Loader';
import IngredientsAllergy from './components/pages/IngredientsAllergy';
import Disease from './components/pages/Disease';
import AppPwdTrackThank from './config/AppPwdTrackThank';



const Home = React.lazy(() => import('./components/pages/Home'));
const Over40 = React.lazy(() => import('./components/pages/Over40'));
const Men = React.lazy(() => import('./components/pages/Men'));
const Women = React.lazy(() => import('./components/pages/Women'));
const Bk = React.lazy(() => import('./components/common/Bk'));
const General_condtions = React.lazy(() => import('./components/generalpages/General_conditions'));
const Data_protection_policy = React.lazy(() => import('./components/generalpages/Data_protection_policy'));
const Faq = React.lazy(() => import('./components/generalpages/Faq'));
const Contact = React.lazy(() => import('./components/generalpages/Contact'));
const Privacy_policy = React.lazy(() => import('./components/generalpages/Privacy_policy'));
const Cookie_policy = React.lazy(() => import('./components/generalpages/Cookie_policy'));


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  return (
    <div className='maly'>
      <Head />

      <Suspense fallback={<Loader />}>
        <BrowserRouter basename="/">
          <ScrollToTop />
          <Routes>

            <Route exact path="/" element={<Home />} />
            {/* <Route exact path="/lp1" element={<HomeV2js />} /> */}
            <Route exact path="/bk" element={<Bk />} />

            {/* Default */}
            <Route exact path="/how-familiar.html" element={<HowFamiliar />} />
            <Route exact path="/part1.html" element={<Part1 />} />
            <Route exact path="/how-much-time.html" element={<HowMuchTime />} />
            <Route exact path="/part2.html" element={<Part2 />} />
            <Route exact path="/part3.html" element={<Part3 />} />
            <Route exact path="/part4.html" element={<Part4 />} />
            <Route exact path="/part5.html" element={<Part5 />} />
            <Route exact path="/part6.html" element={<Part6 />} />
            <Route exact path="/part7.html" element={<Part7 />} />
            <Route exact path="/part8.html" element={<Part8 />} />
            <Route exact path="/part9.html" element={<Part9 />} />
            <Route exact path="/email.html" element={<Email />} />
            <Route exact path="/final.php" element={<Final />} />
            <Route exact path="/general-conditions.html" element={<General_condtions />} />
            <Route exact path="/data-protection-policy.html" element={<Data_protection_policy />} />
            <Route exact path="/faq.html" element={<Faq />} />
            <Route exact path="/contact.html" element={<Contact />} />
            <Route exact path="/privacy-policy.html" element={<Privacy_policy />} />
            <Route exact path="/cookie-policy.html" element={<Cookie_policy />} />
            <Route exact path="/men" element={<Men />} />
            <Route exact path="/women" element={<Women />} />
            <Route exact path="/offers/thank-you.php" element={<Thankyou />} />
            <Route exact path="/callback/pg/:getTranId" element={<PayResponse />} />
            {/* <Route exact path="*" element={<NotFound />} /> */}

            {/* add on pages on 01nov2023 */}
            <Route exact path="/kb-body-type-target-mix.html" element={<BodyTypeTargetMix />} />
            {/* <Route exact path="/kb-goals-mix.html" element={<GoalMix />} /> */}
            <Route exact path="/kb-social-proof-mix.html" element={<SocialProofMix />} />
            <Route exact path="/kb-target-zones-mix.html" element={<TargetZonesMix />} />
            <Route exact path="/kb-happy-weight.html" element={<HappyWeight />} />
            <Route exact path="/kb-motivation.html" element={<Motivation />} />
            <Route exact path="/kb-motivation.html" element={<Motivation />} />
            <Route exact path="/kb-weight-current.html" element={<WeightCurrent />} />
            <Route exact path="/kb-weight-target.html" element={<WeightTarget />} />
            {/* <Route exact path="/kb-weight-age.html" element={<WeightAge />} /> */}
            <Route exact path="/feedback-summary.html" element={<FeedbackSummary />} />
            <Route exact path="/kb-occasion.html" element={<Occasion />} />
            <Route exact path="/kb-monthly-result.html" element={<OccasionResult />} />
            <Route exact path="/kb-weekly-result.html" element={<Result />} />
            <Route exact path="/register-form.html" element={<UserRegisterForm />} />
            <Route exact path="/ingredients-allergy.html" element={<IngredientsAllergy />} />
            <Route exact path="/disease.html" element={<Disease />} />
            <Route exact path="/deep/app-pwd-track" element={<AppPwdTrackThank />} />


            {/* Men */}
            {/* <Route exact path="/men/ApiTest" element={<ApiTest />} /> */}
            <Route exact path="/men/how-familiar.html" element={<HowFamiliar />} />
            <Route exact path="/men/part1.html" element={<Part1 />} />
            <Route exact path="/men/how-much-time.html" element={<HowMuchTime />} />
            <Route exact path="/men/part2.html" element={<Part2 />} />
            <Route exact path="/men/part3.html" element={<Part3 />} />
            <Route exact path="/men/part4.html" element={<Part4 />} />
            <Route exact path="/men/part5.html" element={<Part5 />} />
            <Route exact path="/men/part6.html" element={<Part6 />} />
            <Route exact path="/men/part7.html" element={<Part7 />} />
            <Route exact path="/men/part8.html" element={<Part8 />} />
            <Route exact path="/men/part9.html" element={<Part9 />} />
            <Route exact path="/men/email.html" element={<Email />} />
            <Route exact path="/men/final.php" element={<Final />} />
            <Route exact path="/men/general-conditions.html" element={<General_condtions />} />
            <Route exact path="/men/data-protection-policy.html" element={<Data_protection_policy />} />
            <Route exact path="/men/faq.html" element={<Faq />} />
            <Route exact path="/men/contact.html" element={<Contact />} />
            <Route exact path="/men/privacy-policy.html" element={<Privacy_policy />} />
            <Route exact path="/men/cookie-policy.html" element={<Cookie_policy />} />
            {/* add on pages on 01nov2023 */}
            <Route exact path="/men/kb-body-type-target-mix.html" element={<BodyTypeTargetMix />} />
            {/* <Route exact path="/men/kb-goals-mix.html" element={<GoalMix />} /> */}
            <Route exact path="/men/kb-social-proof-mix.html" element={<SocialProofMix />} />
            <Route exact path="/men/kb-target-zones-mix.html" element={<TargetZonesMix />} />
            <Route exact path="/men/kb-happy-weight.html" element={<HappyWeight />} />
            <Route exact path="/men/kb-motivation.html" element={<Motivation />} />
            <Route exact path="/men/kb-motivation.html" element={<Motivation />} />
            <Route exact path="/men/kb-weight-current.html" element={<WeightCurrent />} />
            <Route exact path="/men/kb-weight-target.html" element={<WeightTarget />} />
            {/* <Route exact path="/men/kb-weight-age.html" element={<WeightAge />} /> */}
            <Route exact path="/men/feedback-summary.html" element={<FeedbackSummary />} />
            <Route exact path="/men/kb-occasion.html" element={<Occasion />} />
            <Route exact path="/men/kb-monthly-result.html" element={<OccasionResult />} />
            <Route exact path="/men/kb-weekly-result.html" element={<Result />} />
            <Route exact path="/men/register-form.html" element={<UserRegisterForm />} />
            <Route exact path="/men/ingredients-allergy.html" element={<IngredientsAllergy />} />
            <Route exact path="/men/disease.html" element={<Disease />} />


            {/* Women */}
            {/* <Route exact path="/women/ApiTest" element={<ApiTest />} /> */}
            <Route exact path="/women/how-familiar.html" element={<HowFamiliar />} />
            <Route exact path="/women/part1.html" element={<Part1 />} />
            <Route exact path="/women/how-much-time.html" element={<HowMuchTime />} />
            <Route exact path="/women/part2.html" element={<Part2 />} />
            <Route exact path="/women/part3.html" element={<Part3 />} />
            <Route exact path="/women/part4.html" element={<Part4 />} />
            <Route exact path="/women/part5.html" element={<Part5 />} />
            <Route exact path="/women/part6.html" element={<Part6 />} />
            <Route exact path="/women/part7.html" element={<Part7 />} />
            <Route exact path="/women/part8.html" element={<Part8 />} />
            <Route exact path="/women/part9.html" element={<Part9 />} />
            <Route exact path="/women/email.html" element={<Email />} />
            <Route exact path="/women/final.php" element={<Final />} />
            <Route exact path="/women/general-conditions.html" element={<General_condtions />} />
            <Route exact path="/women/data-protection-policy.html" element={<Data_protection_policy />} />
            <Route exact path="/women/faq.html" element={<Faq />} />
            <Route exact path="/women/contact.html" element={<Contact />} />
            <Route exact path="/women/privacy-policy.html" element={<Privacy_policy />} />
            <Route exact path="/women/cookie-policy.html" element={<Cookie_policy />} />
            <Route exact path="/women/ingredients-allergy.html" element={<IngredientsAllergy />} />
            <Route exact path="/women/disease.html" element={<Disease />} />


            {/* add on pages on 01nov2023 */}
            <Route exact path="/women/kb-body-type-target-mix.html" element={<BodyTypeTargetMix />} />
            {/* <Route exact path="/women/kb-goals-mix.html" element={<GoalMix />} /> */}
            <Route exact path="/women/kb-social-proof-mix.html" element={<SocialProofMix />} />
            <Route exact path="/women/kb-target-zones-mix.html" element={<TargetZonesMix />} />
            <Route exact path="/women/kb-happy-weight.html" element={<HappyWeight />} />
            <Route exact path="/women/kb-motivation.html" element={<Motivation />} />
            <Route exact path="/women/kb-motivation.html" element={<Motivation />} />
            <Route exact path="/women/kb-weight-current.html" element={<WeightCurrent />} />
            <Route exact path="/women/kb-weight-target.html" element={<WeightTarget />} />
            {/* <Route exact path="/women/kb-weight-age.html" element={<WeightAge />} /> */}
            <Route exact path="/women/feedback-summary.html" element={<FeedbackSummary />} />
            <Route exact path="/women/kb-occasion.html" element={<Occasion />} />
            <Route exact path="/women/kb-monthly-result.html" element={<OccasionResult />} />
            <Route exact path="/women/kb-weekly-result.html" element={<Result />} />
            <Route exact path="/women/register-form.html" element={<UserRegisterForm />} />

            {/* Over40 */}
            <Route exact path="/over40" element={<Over40 />} />
            <Route exact path="/over40/how-familiar.html" element={<HowFamiliar />} />
            <Route exact path="/over40/part1.html" element={<Part1 />} />
            <Route exact path="/over40/how-much-time.html" element={<HowMuchTime />} />
            <Route exact path="/over40/part2.html" element={<Part2 />} />
            <Route exact path="/over40/part3.html" element={<Part3 />} />
            <Route exact path="/over40/part4.html" element={<Part4 />} />
            <Route exact path="/over40/part5.html" element={<Part5 />} />
            <Route exact path="/over40/part6.html" element={<Part6 />} />
            <Route exact path="/over40/part7.html" element={<Part7 />} />
            <Route exact path="/over40/part8.html" element={<Part8 />} />
            <Route exact path="/over40/part9.html" element={<Part9 />} />
            <Route exact path="/over40/email.html" element={<Email />} />
            <Route exact path="/over40/final.php" element={<Final />} />
            <Route exact path="/over40/general-conditions.html" element={<General_condtions />} />
            <Route exact path="/over40/data-protection-policy.html" element={<Data_protection_policy />} />
            <Route exact path="/over40/faq.html" element={<Faq />} />
            <Route exact path="/over40/contact.html" element={<Contact />} />
            <Route exact path="/over40/privacy-policy.html" element={<Privacy_policy />} />
            <Route exact path="/over40/cookie-policy.html" element={<Cookie_policy />} />

            {/* add on pages on 01nov2023 */}
            <Route exact path="/over40/kb-body-type-target-mix.html" element={<BodyTypeTargetMix />} />
            {/* <Route exact path="/over40/kb-goals-mix.html" element={<GoalMix />} /> */}
            <Route exact path="/over40/kb-social-proof-mix.html" element={<SocialProofMix />} />
            <Route exact path="/over40/kb-target-zones-mix.html" element={<TargetZonesMix />} />
            <Route exact path="/over40/kb-happy-weight.html" element={<HappyWeight />} />
            <Route exact path="/over40/kb-motivation.html" element={<Motivation />} />
            <Route exact path="/over40/kb-motivation.html" element={<Motivation />} />
            <Route exact path="/over40/kb-weight-current.html" element={<WeightCurrent />} />
            <Route exact path="/over40/kb-weight-target.html" element={<WeightTarget />} />
            {/* <Route exact path="/over40/kb-weight-age.html" element={<WeightAge />} /> */}
            <Route exact path="/over40/feedback-summary.html" element={<FeedbackSummary />} />
            <Route exact path="/over40/kb-occasion.html" element={<Occasion />} />
            <Route exact path="/over40/kb-monthly-result.html" element={<OccasionResult />} />
            <Route exact path="/over40/kb-weekly-result.html" element={<Result />} />
            <Route exact path="/over40/register-form.html" element={<UserRegisterForm />} />
            <Route exact path="/over40/ingredients-allergy.html" element={<IngredientsAllergy />} />
            <Route exact path="/over40/disease.html" element={<Disease />} />


          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}
export default React.memo(App);
