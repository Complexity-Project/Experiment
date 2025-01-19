var jsPsych = initJsPsych();


window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

async function getSessionId() {
    try {
        const response = await fetch('check_session.php');
        const data = await response.json();
        if (data.success) {
            return data.session;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error getting session:', error);
        return null;
    }
}

async function completeSession(session_id) {
    try {
        const response = await fetch('complete_session.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `session_id=${session_id}`
        });
        console.log("Session completed");
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Error completing session:', error);
        return false;
    }
}

async function releaseSession(session_id) {
    try {
        const response = await fetch('release_session.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `session_id=${session_id}`
        });
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Error releasing session:', error);
        return false;
    }
}

function gettimestamp()
{
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "-" + twoDigit(month + 1) + "-" + twoDigit(day) + "-" + twoDigit(hour) + "-" + twoDigit(minute) + "-" + twoDigit(second);
}


function twoDigit(n) {
    if(n < 10) {
        return "0" + n;
    } 
    else {
        return n;
    }
}

var instructions = 
{
    welcome: `
        <div class="textBox">    
        <h1>Welcome</h1>

        <p>If you would like to participate in our experiment, please press the button below.</p>
        <p>The experiment will enter full screen mode.</p>
        </div>`,

    consent: `
        <div class="textBox" style="margin: 0 10% 0 10%;"> 
        <h1>Consent to Participate in the Complexity Study</h1>

        <p>This is a psychology experiment being conducted by Dr. Peter Dayan, 
        director of the Max Planck Institute for Biological Cybernetics, and the 
        members of his lab. In order to consent to participate, you MUST meet the 
        following criteria:</p>

        <p>
        <b>
        <ol>
            <li>18 years of age or older</li>
            <li>Fluent speaker of English</li>
            <li>Have not previously participated in this experiment</li>
        </ol>
        </b>
        </p>

        <p>This study examines how people perceive complexity in images. You will be shown pairs of images and asked to select which one appears more complex to you.</p>
        <p><b>The study will take about 15 minutes and will pay 2.60 pounds.</b></p>

        <p>Your participation in this research is voluntary. You may refrain from 
        answering any questions that make you uncomfortable and may withdraw your 
        participation at any time without penalty by exiting this task and alerting 
        the experimenter. You may choose not to complete certain parts of the task 
        or answer certain questions. You may contact us at the address provided 
        below if you have additional questions or concerns.</p> 

        <p>Other than monetary compensation, participating in this study will provide no direct benefits to you. 
        However, this research will contribute to our scientific understanding of how humans perceive and 
        process semantic complexity in images, which has important applications in fields like computer vision, art, and design.</p>

        <p>Your online username may be connected to your individual responses, but 
        we will not be asking for any additional personally identifying information, 
        and we will handle responses as confidentially as possible. We cannot however 
        guarantee the confidentiality of information transmitted over the Internet. 
        We will be keeping de-identified data collected as part of this experiment 
        indefinitely. Data used in scientific publications will remain completely 
        anonymous.</p>

        <p>If you have any questions about the study, feel free to contact our lab. 
        Dr. Dayan and his lab members can be reached at <a href="mailto: kyblab.tuebingen@gmail.com?subject=Questions - Complexity Experiment">
        kyblab.tuebingen@gmail.com</a></p>

        <p>By selecting the 'consent' option below, I acknowledge that I am 18 years or 
        older, that I am a fluent speaker of English, that I have read this consent 
        form, and that I agree to take part in the research.</p>
        </div>
    `,

    dataprotection: `
        <div class="textBox" style="margin: 0 10% 0 10%;">
        <h1><br>Legal Declaration of Consent under Data Protection Law</h1>
        <p><a target="_blank" rel="noopener noreferrer" href="https://kyblab.tuebingen.mpg.de/fma/dataprotection.pdf">Please click here to view our Data Protection Information Sheet, yours to keep.</a></p>
        <p>I have received and took note of the written Data Protection Information Sheet for this study. In doing so, I had sufficient time and opportunity to ask questions about data protection and reconsider my participation in the study. </p>
        <p>I am aware that:</p>
        <ul>
            <li>the processing and use of the collected data occur in a pseudonymized form within the scope of the legally prescribed provisions.
                As a general rule, the storage occurs in the form of questionnaires, as well as on electronic data media, for 10 years
                or longer, if this is required by the purpose of the study.</li>
            <li>by providing further personal data in pseudonymized form, collected personal data may be used for the preparation of anonymized
                scientific research work and may also be published and used in an anonymized form in medical journals, scientific publications
                and publicly accessible scientific databases, so that a direct assignment to my person cannot be established.</li>
            <li>the information obtained during this study may also be sent in an anonymized form to cooperation partners within the
                scope of the European General Data Protection Regulation for scientific purposes and to cooperation partners outside of the
                European Union, i.e. to countries with a lower data protection level (this also applies to the USA).</li>
            <li>the data collected within the scope of the study can also be used and processed in the future inside of the Institute.</li>
        </ul>
        <p>I was informed about my rights, that at any time:</p>
        <ul>
              <li>I can withdraw this declaration of consent.</li>
              <li>I can request information about my stored data and request the correction or blocking of data.</li>
              <li>by cancellation of my participation in the study, I can request that my personal data collected until that time are immediately deleted or anonymized.</li>
              <li>I can request that my data are handed out to me or to third parties (if technically feasible).</li>
        </ul>
        <p>I herewith declare that:</p>
        <ul>
              <li>I have been adequately informed about the collection and processing of my data and rights.</li>
              <li>I consent to the collection and processing of personal data within the scope of the study and its pseudonymized disclosure so that
                only the persons conducting the study can establish a link between the data and my person.</li>
        </ul>
        <p>By selecting the consent option below, I agree to participate in online studies or experiments using learning, and I consent to the use of my data described in the Data Protection Information Sheet and confirm having received a copy of the Data Protection Sheet.</p>
        <p>Note: If you do not consent to participate in this study or have your data used as outlined in the Data Protection Information Sheet, then this experiment will now close and you will not proceed any further. No information about you will be retained. </p>
        </div>
    `,

    overview: `
        <div class="textBox" style="margin: 0 10% 0 10%;"> 
        <h1>Overview</h1>

        <p>Thank you for your consent to participate in our study.<br> 

        <p>In this study, you will be shown pairs of images and asked to judge which one appears more <b>visually complex</b> to you.</p>
  
        <p>You will make 200 (+3 for attention checks) comparisons in total. For each pair, simply click on the image you judge to be more complex. There are no right or wrong answers - we are interested in your perception of complexity.</p>
        <p>At the end of the study, we will ask brief questions to better understand your judgements on the image complexity.</p>
        <p>The complete study will take approximately 15 minutes.</p>
        <p><b>We will now show you some example pairs to familiarize you with the task. Click 'Start' to begin.</b></p>
        </div>`,

    ratingstart: `
        <div class="textBox"  style="margin: 0 10% 0 10%;"> 
        <h1>Begin Comparisons</h1>

        <p>Thank you for viewing the example comparisons.</p>

        <p>As you make your choices, please:</p>
        <ul>
            <li>Focus on the <b>visual complexity</b> of the images</li>
            <li>Be mindful of the strategies you use to make your decisions</li>
            <li>Do not take breaks during the experiment, focus on the task</li>
        </ul>

        <p>Lastly, please note that there will be <b>attention checks</b> during the task where you will be asked to select a specific image. Please comply with the instructions on the images, these checks help us ensure the quality of responses.</p>

        <p>Click 'Continue' to begin the experiment.</p>
        </div>`,

    questions: `
        <div class="textBoxfq">
        <h1>Final Questions</h1>

        <p>Thank you for completing the experiment.</p>

        <p>To conclude the study, we will ask you to reflect on the criteria you used to judge visual complexity. This helps our research.</p>

        </div>`,

    end: `
        <div class="textBox">
        <h1>Thank You</h1>
        <p>Thank you for participating in our study! Your completion code is: <b>4EF77C59</b>.</p>
        <p>For any questions or comments please refer to: 
        <a href="mailto: kyblab.tuebingen@gmail.com?subject=Feedback - Complexity Experiment">
        kyblab.tuebingen@gmail.com</a></p>

        <p>You can close this window now.</p>
        </div>`
}

// TRIALS

// TRIAL: Welcome
var welcome = {
    type: jsPsychFullscreen,
    fullscreen_mode: !window.mobileCheck(), // Will be false for mobile devices
    message: instructions.welcome,
    button_label: 'Start'
}

var consent = {
    type: jsPsychHtmlButtonResponse,
    stimulus: instructions.consent,
    choices: ["Yes, I consent to participate", "No, I do not consent to participate"],
    on_finish: function(data){
        if(data.response == 1){
            // Release session first  
            fetch('release_session.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `session_id=${session_id}`
            }).then(() => {
                // Then end experiment
                jsPsych.abortCurrentTimeline();
                document.body.innerHTML = '<p>You did not consent to participate. Thank you for your time!</p><p>You may close this window now.</p>';
            });
        }
    }    
}

var dataprotection = {
    type: jsPsychHtmlButtonResponse,
    stimulus: instructions.dataprotection,
    choices: ["Yes, I consent to participate", "No, I do not consent to participate"],
    on_finish: function(data){
        if(data.response == 1){
            // Release session first
            fetch('release_session.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `session_id=${session_id}`
            }).then(() => {
                // Then end experiment
                jsPsych.abortCurrentTimeline();
                document.body.innerHTML = '<p>You did not consent to participate. Thank you for your time!</p><p>You may close this window now.</p>';
            });
        }
    }    
}

var intro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: instructions.overview,
    choices: ["Start"]
}

var ratingstart = {
    type: jsPsychHtmlButtonResponse,
    stimulus: instructions.ratingstart,
    choices: ["Continue"]
}

var introFinalQuestions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: instructions.questions,
    choices: ["Continue"]
}

// TRIAL: Rating Questions
var openendedQuestions = {
    type: jsPsychSurveyText,
    button_label: "Continue",
    questions: [
        {prompt: "What strategy did you use to rate complexity?", rows: 3, required: true},
        {prompt: "What types of images were the most complex to you?", rows: 3, required: true},
        {prompt: "Which types of image pairs took you longest to decide between? What made these comparisons particularly challenging?", rows: 3, required: true},
    ]
};
var finalComments = {
    type: jsPsychSurveyText,
    button_label: "Finish",
    questions: [
        {prompt: "Is there anything else you would like to tell us?", rows: 7},
    ],
};

var remove_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: false
}

var end = {
    type: jsPsychInstructions,
    pages: [
        instructions.end
    ],
    show_clickable_nav: false
}

/* --------------------------------------------------------- */

// Global variables and utility functions
const subject_id = jsPsych.randomization.randomID(8);
const version = "V1-2024-11-05";  // year-month-day
const timestamp = gettimestamp();
const start_time = timestamp;
let session_id = null;
// for testing: const session_id = 401

// Arrays to store response data
let comparison_responses = [];
let response_times = [];
let selected_images = [];
let comparison_sequence = [];



// Initialize timeline array
var timeline = [];

// Example comparisons
const example_pairs = [
    {
        "id": 1,
        "left_image": "images/examples/2381659.jpg",
        "right_image": "images/examples/2405397.jpg"
    },
    {
        "id": 2,
        "left_image": "images/examples/2388178.jpg",
        "right_image": "images/examples/2355579.jpg"
    },
    {
        "id": 3,
        "left_image": "images/examples/2351919.jpg",
        "right_image": "images/examples/2322063.jpg"
    },
    {
        "id": 4,
        "left_image": "images/examples/2350028.jpg",
        "right_image": "images/examples/2395012.jpg"
    }
];

// Add initial trials (consent, instructions, etc.)
timeline.push(welcome);
timeline.push(consent);
timeline.push(dataprotection);
timeline.push(intro);

// Add example comparisons
var exampleTotalComparisons = example_pairs.length;
var exampleCurrentComparison = 1;

example_pairs.forEach(function(pair) {
    var trial = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
        <div style="text-align: center">
            <div style="background-color: #B8C7DC; padding: 10px; margin: 10px 2% 20px 2%; max-width: 96%;">
                <p style="margin: 0; font-weight: bold; font-size: clamp(14px, 3vw, 16px);">Please look carefully at the following two images and decide which one is more <b>visually complex</b>.</p>
            </div>
            <div style="position: fixed; bottom: 10px; right: 10px; background-color: #f0f0f0; padding: 8px; border-radius: 5px; font-size: clamp(12px, 2.5vw, 14px); z-index: 1000;">
                ${exampleTotalComparisons - exampleCurrentComparison + 1} example comparisons left
            </div>
        </div>
    `,
        choices: [pair.left_image, pair.right_image],
        button_html: function(choice, choice_index) {
            return `
                <div style="text-align: center; ${choice_index === 0 ? 'margin-right: 25px;' : 'margin-left: 25px;'}">
                    <p style="font-weight: bold; margin-bottom: 10px;">${choice_index === 0 ? 'A' : 'B'}</p>
                    <div style="transition: transform 0.3s ease;" 
                         onmouseover="this.style.transform='scale(1.05)'; this.querySelector('img').style.border='2px solid #666';"
                         onmouseout="this.style.transform='scale(1)'; this.querySelector('img').style.border='2px solid transparent';">
                        <button class="jspsych-btn" style="background: none; border: none; padding: 0;">
                            <img src="${choice}" 
                                style="width: 500px; height: 375px; cursor: pointer; border: 2px solid transparent; transition: all 0.3s ease;">
                        </button>
                    </div>
                </div>`;
        },
        data: {
            is_example: true,
            pair_id: pair.id,
            left_image: pair.left_image,
            right_image: pair.right_image,
            comparison_number: exampleCurrentComparison,
            start_time: null,
            response_time: null
        },
        on_load: function() {
            trial.data.start_time = performance.now();
        },
        on_finish: function(data) {
            data.response_time = performance.now() - data.start_time;
            data.selected_image = data.response === 0 ? pair.left_image : pair.right_image;
        }
    };
    exampleCurrentComparison++;
    timeline.push(trial);
});

timeline.push(ratingstart);

function saveData(name, data) {
    // For local testing with XAMPP
    var filename = "./data/" + name + ".csv";
    $.post("write_data.php", {
        postresult: data + "\n",
        postfile: filename
    })
    .done(function(response) {
        console.log("Data saved successfully:", response);
    })
    .fail(function(xhr, status, error) {
        console.error("Failed to save data:", error);
        // Fallback to localStorage
        localStorage.setItem(name, data);
    });
}
// Function to read and parse CSV file using fetch
async function loadComparisons(session_id) {
    try {
        const response = await fetch('images/comparisons.csv');
        const csvText = await response.text();
        const rows = csvText.split('\n').slice(1); // Skip header row
        
        const sessionComparisons = rows
            .map(row => {
                const [sess_id, img1, img2] = row.split(',');
                // print the row
                return {
                    session_id: parseInt(sess_id),
                    image1: img1.trim(),
                    image2: img2.trim()
                };
            })
            .filter(comp => comp.session_id === session_id);
            
        return sessionComparisons;
    } catch (error) {
        console.error('Error loading comparisons:', error);
        return [];
    }
}

// Create the comparison trials
async function createComparisonTrials() {
    const comparisons = await loadComparisons(session_id);
    const totalComparisons = comparisons.length;
    let currentComparison = 1;

    // Store comparison sequence
    comparison_sequence = comparisons.map(comp => [comp.image1, comp.image2]);

    comparisons.forEach((pair) => {
        var trial = {
            type: jsPsychHtmlButtonResponse,
            stimulus: `
                <div style="text-align: center">
                    <div style="background-color: #B8C7DC; padding: 10px; margin: 10px 2% 20px 2%; max-width: 96%;">
                        <p style="margin: 0; font-weight: bold; font-size: clamp(14px, 3vw, 16px);">Please look carefully at the following two images and decide which one is more <b>visually complex</b>.</p>
                    </div>
                    <div style="position: fixed; bottom: 10px; right: 10px; background-color: #f0f0f0; padding: 8px; border-radius: 5px; font-size: clamp(12px, 2.5vw, 14px); z-index: 1000;">
                        ${totalComparisons - currentComparison + 1} comparisons left
                    </div>
                </div>
            `,
            choices: [
                `images/sample/${pair.image1}.jpg`, 
                `images/sample/${pair.image2}.jpg`
            ],
            button_html: function(choice, choice_index) {
                return `
                    <div style="text-align: center; ${choice_index === 0 ? 'margin-right: 25px;' : 'margin-left: 25px;'}">
                        <p style="font-weight: bold; margin-bottom: 10px;">${choice_index === 0 ? 'A' : 'B'}</p>
                        <div style="transition: transform 0.3s ease;" 
                             onmouseover="this.style.transform='scale(1.05)'; this.querySelector('img').style.border='2px solid #666';"
                             onmouseout="this.style.transform='scale(1)'; this.querySelector('img').style.border='2px solid transparent';">
                            <button class="jspsych-btn" style="background: none; border: none; padding: 0;">
                                <img src="${choice}" 
                                    style="width: 500px; height: 375px; cursor: pointer; border: 2px solid transparent; transition: all 0.3s ease;">
                            </button>
                        </div>
                    </div>`;
            },
            data: {
                session_id: session_id,
                pair_id: currentComparison,
                image1: pair.image1,
                image2: pair.image2,
                comparison_number: currentComparison,
                start_time: null,
                response_time: null
            },
            on_load: function() {
                trial.data.start_time = performance.now();
            },
            on_finish: function(data) {
                // Calculate and store response time
                const rt = performance.now() - data.start_time;
                data.response_time = rt;
                
                // Store which image was selected
                const selected = data.response === 0 ? pair.image1 : pair.image2;
                data.selected_image = selected;
                
                // Add to our arrays
                comparison_responses.push(data.response);
                response_times.push(rt);
                selected_images.push(selected);
            }
        };
        
        timeline.push(trial);
        currentComparison++;
    });

    // Add the data saving trial at the end
    const writeToServer = {
        type: jsPsychCallFunction,
        func: async function() {
            const end_time = gettimestamp();
            
            // Get the questionnaire responses from jsPsych's data
            const questionResponses = jsPsych.data.get().filter({trial_type: 'survey-text'}).values();
            const openEndedResponses = questionResponses[0] ? questionResponses[0].response : {};
            const finalCommentsResponse = questionResponses[1] ? questionResponses[1].response : {};
            
            const dictionary = {
                "start_time": start_time,
                "end_time": end_time,
                "subject_id": subject_id,
                "session_id": session_id,
                "comparison_sequence": comparison_sequence,
                "comparison_responses": comparison_responses,
                "response_times": response_times,
                "selected_images": selected_images,
                "strategy_response": openEndedResponses['Q0'] || '',
                "most_complex_response": openEndedResponses['Q1'] || '',
                "challenging_pairs_response": openEndedResponses['Q2'] || '',
                "additional_comments": finalCommentsResponse['Q0'] || ''
            };
    
            try {
                // First save data
                const filename = "data_" + timestamp + "__" + dictionary["end_time"] + "_" + subject_id;
                // Convert dictionary to CSV content
                const csvRows = [];
                
                // Add header row
                csvRows.push(Object.keys(dictionary).join(','));
                
                // Add data row - handle arrays by wrapping them in quotes
                const dataRow = Object.values(dictionary).map(value => {
                    if (Array.isArray(value)) {
                        return `"${value.join(';')}"`;
                    }
                    // Escape any commas in text responses
                    if (typeof value === 'string' && value.includes(',')) {
                        return `"${value}"`;
                    }
                    return value;
                }).join(',');
                csvRows.push(dataRow);
                
                const csvContent = csvRows.join('\n');
                await saveData(filename, csvContent);
                
                const response = await fetch('complete_session.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `session_id=${session_id}`
                });
    
                const result = await response.json();
                if (!result.success) {
                    console.error('Error completing session:', result.message);
                }
            } catch (error) {
                console.error('Error in completion process:', error);
            }
        }
    };
    
    
    // Add final trials
    timeline.push(introFinalQuestions);
    timeline.push(openendedQuestions);
    timeline.push(finalComments);
    timeline.push(writeToServer);
    timeline.push(remove_fullscreen);
    timeline.push(end);

    // Start the experiment
    jsPsych.run(timeline);
}

async function initializeExperiment() {
    // Get session ID
    session_id = await getSessionId();
    if (!session_id) {
        jsPsych.endExperiment('No available sessions. Please try again later.');
        return;
    }
    jsPsych.data.addProperties({
        subject: subject_id,
        timestamp: timestamp,
        version: version,
        session_id: session_id
    });

    // Start the experiment
    createComparisonTrials();
}

initializeExperiment();