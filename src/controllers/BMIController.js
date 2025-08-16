import { useEffect, useState } from 'react';
import { ReactSession } from 'react-client-session';
import API_BASE_URL from '../config/constants';

export const BMIController = () => {
    ReactSession.setStoreType('localStorage');

    const [result_description, setresult_description] = useState();
    const [our_promise_img, setOur_promise_img] = useState();
    const [gender_name, set_gender_name] = useState(null);
    const [familiarity_name, set_familiarity_name] = useState(null);
    const [meal_preparation_name, set_meal_preparation_name] = useState(null);
    const [activity_name, set_activity_name] = useState(null);
    const [typical_day_for_you_name, set_typical_day_for_you_name] = useState(null);
    const [what_stands_true_for_you_name, set_what_stands_true_for_you_name] = useState([]);
    const [data, setData] = useState(false);
    const [fs_data, setFsData] = useState({ "feedback_summary_break": {}, "feedback_summary": { feedback_summary_title_a: "Body Mass Index (BMI)" } }); //{ "feedback_summary_break": {}, "feedback_summary": { feedback_summary_title_a: "Body Mass Index (BMI)" } }
    const [isLoading, setIsLoading] = useState(false);
    const [bmi_left_percent, setBmiLeftPercent] = useState(0);

    const what_stands_true_for_youArr = [];
    const getSurveyItemsName = async () => {

        const state = JSON.parse(ReactSession.get('ketobalanced_options'));
        // console.log(state.survey);
        if (!ReactSession.get('gender') || !ReactSession.get('current_body_type') || !ReactSession.get('howmuchtime') || !ReactSession.get('part1') || !ReactSession.get('part2') || !ReactSession.get('part3') || !ReactSession.get('part4') || !ReactSession.get('part5') || !ReactSession.get('part6') || !ReactSession.get('part7')) {
            // history('/');
            // return false;
        }



        const familiarityIndex = state.survey.surveyItems[19].categoryItems.findIndex(element => element.itemId == ReactSession.get('current_body_type'));
        const familiarity_name = state.survey.surveyItems[19].categoryItems[familiarityIndex].name;
        set_familiarity_name(familiarity_name);

        const meal_preparationIndex = state.survey.surveyItems[1].categoryItems.findIndex(element => element.itemId == ReactSession.get('howmuchtime'));
        const meal_preparation_name = state.survey.surveyItems[1].categoryItems[meal_preparationIndex].name;
        set_meal_preparation_name(meal_preparation_name);

        const activityIndex = state.survey.surveyItems[18].categoryItems.findIndex(element => element.itemId == ReactSession.get('part5'));
        const activity_name = state.survey.surveyItems[18].categoryItems[activityIndex].name;
        set_activity_name(activity_name);

        const typical_day_for_youIndex = state.survey.surveyItems[24].categoryItems.findIndex(element => element.itemId == ReactSession.get('part6'));
        const typical_day_for_you_name = state.survey.surveyItems[24].categoryItems[typical_day_for_youIndex].name;
        set_typical_day_for_you_name(typical_day_for_you_name);


        ReactSession.get('part7').split(',').forEach((element, index) => {
            const what_stands_true_for_youIndex = state.survey.surveyItems[5].categoryItems[index].name;
            what_stands_true_for_youArr.push(what_stands_true_for_youIndex);
        });
        set_what_stands_true_for_you_name(what_stands_true_for_youArr);
        /* console.log(what_stands_true_for_you_name);
        return false; */
        const genderIndex = state.survey.surveyItems[0].categoryItems.findIndex(element => element.itemId == ReactSession.get('gender'));
        const gender_name = state.survey.surveyItems[0].categoryItems[genderIndex].name;
        set_gender_name(gender_name);

        if (ReactSession.get('weight') == "" || ReactSession.get('target') == "") {
            var weightDataset = ReactSession.get('weight_1');
            var targetDataset = ReactSession.get('target_1');
        }
        else {
            var weightDataset = ReactSession.get('weight');
            var targetDataset = ReactSession.get('target');
        }

        const requestOption = {
            method: "POST",
            // mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "gender": gender_name,
                "age": ReactSession.get('age'),
                "heightCm": ReactSession.get('cm'),
                "heightFeet": ReactSession.get('ft'),
                "heightInch": ReactSession.get('inch'),
                "heightType": ReactSession.get('htype'),
                "weight": weightDataset,
                "targetWeight": targetDataset,
                "weightType": ReactSession.get('type'),
                // "familiarity": familiarity_name,
                "meal_preparation": meal_preparation_name,
                "activity": activity_name,
                "typical_day_for_you": typical_day_for_you_name,
                "what_stands_true_for_you": what_stands_true_for_youArr
            })
        }

        // console.log(requestOption); return false;

        const url = API_BASE_URL + '/pre/bmi';
        await fetch(url, requestOption)
            .then(res => res.json())
            .then((result) => {

                if (result['error']) {
                    console.log(result);
                } else {
                    setData(result);
                    setFsData(result.feedback_summary);
                    ReactSession.set('kb_monthly_result', result.kb_monthly_result);
                    setBmiLeftPercent(determineBodyType(result.feedback_summary.feedback_summary_mbi));
                    setIsLoading(true);
                }

            })
            .catch((err) => {
                setresult_description([]);
                console.log(err);
            })



    }

    function determineBodyType(bmi) {
        if (bmi < 18.5) {
            // return "Underweight"; // 6px
            return 2;
        } else if (bmi < 24.9) {
            // return "Normal Weight"; //40px
            return 10;
        } else if (bmi < 29.9) {
            // return "Overweight"; //175px
            return 47;
        } else if (bmi < 34.9) {
            // return "Obese Class 1 (Moderate)"; //250px
            return 70;
        } else if (bmi < 39.9) {
            // return "Obese Class 2 (Severe)"; //320px
            return 85;
        } else {
            // return "Obese Class 3 (Very Severe or Morbidly Obese)"; //355px
            return 97;
        }
    }

    useEffect(() => {
        getSurveyItemsName();
    }, [])


    if (isLoading === true) {
        return { "fs_data": fs_data, "bmi_left_percent": bmi_left_percent };
    } else {
        return { "fs_data": fs_data, "bmi_left_percent": bmi_left_percent };
    }

};

