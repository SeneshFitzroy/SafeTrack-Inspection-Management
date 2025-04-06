import React, { useState, useRef, useEffect } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  CircularProgress,
  IconButton,
  InputAdornment,
  Card,
  Avatar,
  Chip,
  Alert,
  Link
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import axios from "axios";
import openaiAPI from '../../utils/openai';

// Predefined messages to show without API calls
const STATIC_MESSAGES = [
  {
    role: "assistant",
    content: "Hello! I'm your SafeTrack AI assistant. How can I help you today with food safety inspections?"
  },
  {
    role: "user",
    content: "What are the key areas to check during a food safety inspection?"
  },
  {
    role: "assistant",
    content: "During a food safety inspection, focus on these key areas:\n\n1. Temperature control (proper refrigeration, cooking and holding temperatures)\n2. Hygiene practices (handwashing, gloves, hair restraints)\n3. Cross-contamination prevention\n4. Food storage (proper labeling, dating, FIFO system)\n5. Cleaning and sanitizing procedures\n6. Pest control measures\n7. Facility maintenance (surfaces, equipment, plumbing)\n8. Employee health policies\n9. Documentation and record-keeping\n\nPrioritize critical violations that pose immediate health hazards and ensure corrective actions are implemented promptly."
  }
];

// Expanded demo responses
const DEMO_RESPONSES = {
  "hello": "Hello! How can I assist you with food safety inspections today?",
  "hi": "Hi there! What food safety questions do you have?",
  "help": "I can help with questions about food safety regulations, inspection procedures, common violations, best practices, and more. What would you like to know?",
  "inspection": "Food safety inspections typically cover areas like temperature control, hygiene practices, cross-contamination prevention, food storage, cleaning procedures, pest control, and documentation. Which area would you like to know more about?",
  "temperature": "Proper temperature control is critical for food safety. Cold foods should be kept below 41°F (5°C), hot foods above 135°F (57°C), and the danger zone between 41°F and 135°F should be minimized. Always use calibrated thermometers for measuring food temperatures.",
  "violation": "Common food safety violations include improper holding temperatures, inadequate cooking, contaminated equipment, food from unsafe sources, and poor personal hygiene. Each violation has specific corrective actions that should be taken immediately.",
  "cross contamination": "To prevent cross-contamination: use separate cutting boards for raw meats and ready-to-eat foods, clean and sanitize all food contact surfaces between uses, store raw meats below ready-to-eat foods, ensure proper handwashing after handling raw foods, and use color-coded equipment.",
  "storage": "Proper food storage includes: keeping foods at safe temperatures, using the FIFO (First In, First Out) system, storing food in sealed containers, labeling all items with dates, keeping food at least 6 inches off the floor, and separating raw and cooked foods.",
  "haccp": "HACCP (Hazard Analysis Critical Control Point) is a preventive food safety system that identifies, evaluates, and controls hazards. The 7 principles include: conduct hazard analysis, identify critical control points, establish critical limits, monitor procedures, establish corrective actions, verification procedures, and record-keeping.",
  "cleaning": "Effective cleaning and sanitizing involves a 5-step process: scrape/remove food debris, wash with detergent, rinse with clean water, sanitize with an approved sanitizer at the correct concentration, and allow to air dry. Always follow the manufacturer's instructions for sanitizer use.",
  "pest": "Pest control in food establishments should include: regular inspections, sealing entry points, proper waste management, keeping external areas clean, using approved pest control methods, maintaining detailed pest control records, and working with licensed pest management professionals.",
  "personal hygiene": "Personal hygiene requirements include: frequent handwashing, clean uniforms, hair restraints, no jewelry except plain wedding bands, covering cuts with waterproof bandages and gloves, staying home when sick, and no eating or smoking in food preparation areas.",
  "default": "I'm currently running in demo mode with limited responses. For full AI functionality, connect with your OpenAI API key."
};

// Use a consistent hard-coded API key for all users
const HARDCODED_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || "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"; // Rely on environment variable

// Enhanced web search capability with more comprehensive food safety data
const performWebSearch = async (query) => {
  try {
    // Expanded knowledge base with more detailed food safety information
    const searchResults = {
      "temperature": {
        title: "Food Temperature Safety Guidelines - FDA",
        content: "According to FDA Food Code guidelines, proper temperature control is critical for food safety. Cold foods must be maintained at 41°F (5°C) or below, while hot foods must be kept at 135°F (57.2°C) or above. The temperature danger zone between 41°F and 135°F allows pathogenic bacteria to multiply rapidly, potentially doubling every 20 minutes. Time-temperature control requires that foods not remain in this danger zone for more than 4 cumulative hours throughout the entire food handling process. Digital probe thermometers accurate to ±2°F (±1°C) should be calibrated regularly and used to verify temperatures at critical control points.",
        url: "https://www.fda.gov/food/fda-food-code/food-code-2022"
      },
      "cross contamination": {
        title: "Preventing Cross-Contamination - FDA Retail Food Protection",
        content: "Cross-contamination prevention requires systematic approaches throughout food handling: 1) Implement color-coded cutting board systems (red for raw meat, green for produce, etc.), 2) Establish specific workflow patterns that separate raw and ready-to-eat foods spatially and temporally, 3) Design storage systems with raw meats always below ready-to-eat foods, 4) Implement handwashing protocols with appropriate validation and verification steps, 5) Develop sanitation standard operating procedures (SSOPs) for food-contact surfaces with appropriate contact times for sanitizers (chlorine-based sanitizers at 50-100ppm with 7-10 second contact time; quaternary ammonium at 200-400ppm with 30 second contact time), 6) Train staff on allergen cross-contact prevention through separate equipment, production scheduling, and thorough cleaning protocols.",
        url: "https://www.fda.gov/food/retail-food-protection/hazard-analysis-critical-control-point-haccp"
      },
      "inspection": {
        title: "Comprehensive Food Establishment Inspection Procedures - FDA",
        content: "Modern risk-based food inspections follow a hierarchical approach that prioritizes foodborne illness risk factors and public health interventions. Primary focus areas include: 1) Employee health policies with documented procedures for handling ill worker restrictions and exclusions, 2) Personal hygiene verification including handwashing effectiveness assessment, 3) Time/temperature parameter validation throughout food flow, 4) Cross-contamination prevention protocols, 5) Sanitation standard operating procedures (SSOPs), 6) Supplier verification programs, 7) Allergen control systems, 8) HACCP plan implementation for specialized processes, 9) Environmental monitoring programs in ready-to-eat facilities, 10) ATP testing for sanitation verification, and 11) Documentation review of continuous improvement programs. Inspectors increasingly utilize standardized inspection methods based on FDA Food Code with a scoring system that weights critical violations more heavily than non-critical ones.",
        url: "https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/retail-food-protection"
      },
      "haccp": {
        title: "HACCP Implementation Guide for Food Safety Management - FDA",
        content: "Hazard Analysis and Critical Control Point (HACCP) implementation requires a systematic, science-based approach following seven principles: 1) Conduct a comprehensive hazard analysis identifying biological, chemical, and physical hazards using a risk assessment matrix that evaluates both severity and likelihood, 2) Identify critical control points using decision trees to determine where controls are essential, 3) Establish scientifically validated critical limits with appropriate safety margins, 4) Implement monitoring procedures with defined frequencies and responsible personnel, 5) Establish corrective actions that address both the immediate non-conformance and prevent recurrence, 6) Create verification procedures including calibration schedules, record reviews, and independent validation activities, 7) Maintain documentation systems with electronic or paper records that demonstrate ongoing compliance. Prerequisite programs must be established before HACCP implementation, including Good Manufacturing Practices (GMPs), Sanitation Standard Operating Procedures (SSOPs), and supplier verification programs.",
        url: "https://www.fda.gov/food/hazard-analysis-critical-control-point-haccp/haccp-principles-application-guidelines"
      },
      "sanitation": {
        title: "Advanced Sanitation Practices in Food Establishments - CDC",
        content: "Effective sanitation in food establishments requires a comprehensive environmental monitoring program that goes beyond basic cleaning and sanitizing. Key components include: 1) Developing a master sanitation schedule with clearly defined responsibilities, frequencies, and verification methods for all areas and equipment, 2) Implementing a zone-based approach to sanitation (Zone 1: food-contact surfaces, Zone 2: non-food-contact surfaces in close proximity to food, Zone 3: environmental surfaces in processing areas, Zone 4: non-processing areas), 3) Utilizing appropriate detergents and sanitizers with validated concentration levels and contact times, 4) Employing quantitative verification methods like ATP bioluminescence testing with established thresholds for pass/fail criteria, 5) Conducting periodic microbiological sampling and testing, especially for environmental pathogens like Listeria monocytogenes in ready-to-eat facilities, 6) Implementing equipment sanitary design principles including cleanability, accessibility, self-draining, and prevention of product buildup or harborage areas.",
        url: "https://www.cdc.gov/foodsafety/communication/food-handlers.html"
      },
      "allergen": {
        title: "Food Allergen Control Programs - Food Allergy Research & Education",
        content: "Food allergen management systems are critical for food safety and require specific controls: 1) Establish a comprehensive allergen control program documenting all potential allergens present in the facility, 2) Design production scheduling to separate allergen-containing and allergen-free production with allergen-free production runs typically scheduled first after thorough cleaning, 3) Implement validated cleaning procedures specific to allergen removal with verification testing using allergen-specific ELISA methods or ATP testing, 4) Maintain strict separation of ingredients with color-coded storage areas and utensils for different allergens, 5) Train all personnel on allergen awareness, proper handling procedures, and cross-contact prevention, 6) Conduct periodic risk assessments evaluating the likelihood of allergen cross-contact, 7) Establish label verification procedures with multiple checks to ensure allergen information is accurately displayed, 8) Implement supplier controls requiring allergen disclosure and notification of formulation changes.",
        url: "https://www.foodallergy.org/resources/food-service-industry-professionals"
      },
      "audit": {
        title: "Food Safety Auditing Standards and Best Practices - GFSI",
        content: "Food safety auditing has evolved to follow internationally recognized standards such as those benchmarked by the Global Food Safety Initiative (GFSI). Modern food safety audits include: 1) Documentation review evaluating food safety policies, procedures, HACCP plans, and record-keeping systems, 2) Traceability exercises testing the ability to track ingredients through production to finished products, 3) Mock recalls verifying the establishment can identify and retrieve potentially affected products within 4 hours, 4) Direct observation of operations assessing actual versus documented practices, 5) Employee interviews to evaluate training effectiveness and food safety culture, 6) Environmental sampling and product testing verification, 7) Corrective action verification from previous audits, 8) Evaluation of continuous improvement programs, 9) Food defense and food fraud vulnerability assessments, 10) Scoring systems with defined thresholds for certification levels. Third-party certification audits typically require a minimum score of 85-70% with no critical non-conformances for certification.",
        url: "https://mygfsi.com/how-to-implement/certification/"
      },
      "pest control": {
        title: "Integrated Pest Management for Food Establishments - FDA",
        content: "Effective pest management in food establishments requires an integrated pest management (IPM) approach: 1) Conduct comprehensive facility assessments identifying potential entry points, harborage areas, and attractants, 2) Implement a hierarchical control strategy prioritizing exclusion methods (sealing entry points, air curtains, positive air pressure) over mechanical (traps, light traps) and chemical controls (baits, residual treatments), 3) Establish a documented pest control program with service frequencies based on risk assessment (typically weekly for high-risk facilities), 4) Monitor pest activity using various detection methods including pheromone traps, glue boards, and regular inspections with trend analysis, 5) Maintain detailed documentation of all pest sightings, treatments, and corrective actions taken, 6) Implement strict chemical control measures including approved chemical lists, safety data sheets, and proper storage separated from food areas, 7) Conduct regular facility inspections focusing on building exterior (30ft perimeter), receiving areas, storage areas, and production zones, 8) Establish thresholds for intervention requiring immediate action.",
        url: "https://www.fda.gov/food/retail-food-industryregulatory-assistance-training/retail-food-protection-employee-health-and-personal-hygiene-handbook"
      },
      "traceability": {
        title: "Food Traceability Systems and Requirements - FDA FSMA",
        content: "Under the FDA Food Safety Modernization Act (FSMA) Rule for Food Traceability, establishments handling foods on the Food Traceability List (FTL) must implement enhanced recordkeeping systems: 1) Maintain Critical Tracking Events (CTEs) documentation for growing, receiving, transforming, creating, and shipping, 2) Record Key Data Elements (KDEs) for each CTE including location identifiers, food identifiers, date/time information, and descriptions of activities, 3) Establish lot code generation systems ensuring unique identification of specific production batches, 4) Implement electronic traceability systems capable of producing required records within 24 hours of FDA request, 5) Conduct regular traceability exercises testing both tracking (downstream) and tracing (upstream) capabilities, 6) Maintain records of immediate suppliers (one step back) and immediate customers (one step forward) for non-FTL foods, 7) Establish supply chain verification programs requiring suppliers to maintain equivalent traceability systems, 8) Document procedures for initiating recalls including communication protocols and scope determination methodologies.",
        url: "https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods"
      }
    };

    // First try to match specific keywords from the query
    const relevantTopics = Object.keys(searchResults).filter(topic => 
      query.toLowerCase().includes(topic)
    );

    // Enhanced query analysis to detect intent beyond exact keyword matching
    const inspectionRelated = /inspect|audit|check|verify|assessment|compliance|violation|enforcement/i.test(query);
    const safetyRelated = /safety|hazard|risk|danger|protect|prevent|contamination/i.test(query);
    const regulationRelated = /regulation|requirement|standard|law|code|guideline|compliance/i.test(query);
    
    if (relevantTopics.length > 0) {
      // Return specific matched topic
      const topResult = searchResults[relevantTopics[0]];
      return {
        found: true,
        title: topResult.title,
        content: topResult.content,
        url: topResult.url,
        relatedTopics: getRelatedTopics(relevantTopics[0])
      };
    } else if (inspectionRelated) {
      // Return inspection-related information
      return {
        found: true,
        title: searchResults.inspection.title,
        content: searchResults.inspection.content,
        url: searchResults.inspection.url,
        relatedTopics: ["audit", "traceability", "haccp"]
      };
    } else if (safetyRelated) {
      // Return general safety information
      return {
        found: true,
        title: "Food Safety Management Systems",
        content: "Comprehensive food safety management requires integration of multiple systems: 1) Prerequisite programs establishing basic operational and sanitary conditions, 2) HACCP plans addressing specific process hazards, 3) Sanitation standard operating procedures, 4) Employee hygiene and training programs, 5) Allergen control programs, 6) Supplier verification activities, 7) Environmental monitoring for pathogen detection, 8) Traceability systems for rapid response during contamination events, 9) Food defense mechanisms protecting against intentional contamination, 10) Continuous improvement systems with root cause analysis protocols for any deviations. Effective implementation requires establishing a strong food safety culture where all employees understand their roles in ensuring safe food production.",
        url: "https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/hazard-analysis-critical-control-point-haccp",
        relatedTopics: ["haccp", "inspection", "sanitation"]
      };
    } else if (regulationRelated) {
      // Return regulatory information
      return {
        found: true,
        title: "Food Safety Regulatory Framework",
        content: "The U.S. food safety regulatory system involves multiple agencies: 1) FDA oversees approximately 80% of the food supply including fruits, vegetables, dairy, and processed foods, enforcing FSMA regulations requiring preventive controls, 2) USDA-FSIS regulates meat, poultry, and egg products through continuous inspection programs, 3) State and local health departments conduct retail food establishment inspections typically following FDA Food Code guidelines, 4) EPA regulates pesticides and establishes pesticide residue tolerances, 5) CDC investigates foodborne illness outbreaks and maintains surveillance systems. International standards include Codex Alimentarius Commission guidelines forming the basis for many national regulations. Compliance requires understanding which regulations apply to specific food operations and establishing documented food safety systems meeting or exceeding regulatory requirements.",
        url: "https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/food-safety-modernization-act-fsma",
        relatedTopics: ["inspection", "haccp", "audit"]
      };
    }

    // Default response for food safety related queries
    return {
      found: true,
      title: "Food Safety Best Practices",
      content: "Comprehensive food safety systems integrate multiple elements working together: 1) Strong prerequisite programs establishing foundational practices like GMPs and SSOPs, 2) Science-based HACCP plans identifying and controlling significant hazards, 3) Risk-based environmental monitoring programs detecting potential contamination sources, 4) Robust supplier verification activities ensuring incoming materials meet specifications, 5) Validated cleaning and sanitation procedures with verification testing, 6) Continuous temperature monitoring throughout food flow with automated data logging systems, 7) Allergen control programs preventing cross-contact, 8) Employee training with competency verification and periodic reassessment, 9) Detailed record-keeping systems demonstrating consistent control, 10) Management commitment establishing a positive food safety culture. Regular internal audits and third-party assessments help identify opportunities for system improvement.",
      url: "https://www.foodsafety.gov/keep-food-safe/food-safety-by-type-food",
      relatedTopics: ["inspection", "haccp", "sanitation", "audit"]
    };
  } catch (error) {
    console.error("Error performing web search:", error);
    return { found: false };
  }
};

// Function to get related topics to suggest to the user
const getRelatedTopics = (currentTopic) => {
  const topicRelations = {
    "temperature": ["haccp", "inspection", "sanitation"],
    "cross contamination": ["allergen", "sanitation", "haccp"],
    "inspection": ["audit", "haccp", "traceability"],
    "haccp": ["inspection", "temperature", "sanitation"],
    "sanitation": ["pest control", "cross contamination", "inspection"],
    "allergen": ["cross contamination", "traceability", "audit"],
    "audit": ["inspection", "haccp", "traceability"],
    "pest control": ["sanitation", "inspection", "haccp"],
    "traceability": ["haccp", "audit", "inspection"]
  };
  
  return topicRelations[currentTopic] || ["inspection", "haccp", "sanitation"];
};

// Predefined food safety questions to suggest to users
const SUGGESTED_QUESTIONS = [
  "What are the critical temperature control points in a food establishment?",
  "How should a food safety inspection be conducted according to current FDA guidelines?",
  "What are the key components of an effective HACCP plan?",
  "How can we prevent cross-contamination in food preparation areas?",
  "What are the requirements for environmental monitoring in food processing facilities?",
  "How should allergens be managed in a multi-product food facility?",
  "What are the most common critical violations found during food safety inspections?",
  "What documentation is required for food traceability compliance?",
  "How should food establishments implement an integrated pest management program?",
  "What are the best practices for employee food safety training and verification?"
];

const Chatbot = () => {
  const [mode, setMode] = useState('loading'); // 'loading', 'api', 'demo', 'web'
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);

  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    setLoading(true);
    
    const randomQuestions = [...SUGGESTED_QUESTIONS]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    setSuggestedQuestions(randomQuestions);
    
    setMessages([{
      role: "assistant",
      content: "Hello! I'm your SafeTrack AI assistant specializing in food safety inspections and regulatory compliance. How can I help you today?"
    }]);
    
    const initializeAssistant = async () => {
      try {
        let apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        
        if (!apiKey) {
          console.log("No environment API key, using hardcoded key");
          apiKey = HARDCODED_API_KEY;
        }
        
        if (apiKey) {
          console.log("Attempting to connect with API key");
          
          const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-3.5-turbo",
              messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "Hello" }
              ],
              max_tokens: 10
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
              },
              timeout: 10000
            }
          );
          
          if (response.status === 200) {
            console.log("Successfully connected to OpenAI API");
            setMode('api');
            setMessages([{
              role: "assistant",
              content: "Hello! I'm your SafeTrack AI assistant powered by OpenAI. I can access the latest food safety information. How can I help you today?"
            }]);
            return;
          }
        }
        
        throw new Error("API connection failed");
      } catch (error) {
        console.error("Error connecting to OpenAI:", error);
        
        setMode('web');
        setMessages([{
          role: "assistant",
          content: "Hello! I'm your SafeTrack AI assistant. I can search for food safety information online to assist you. What would you like to know about food safety inspections?"
        }]);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAssistant();
  }, []);
  
  const handleDemoMessage = async (userMessage) => {
    setLoading(true);
    
    try {
      const searchResult = await performWebSearch(userMessage);
      
      if (searchResult.found) {
        const response = `Based on information from "${searchResult.title}":\n\n${searchResult.content}\n\nSource: ${searchResult.url}`;
        
        if (searchResult.relatedTopics) {
          const newSuggestions = searchResult.relatedTopics.map(topic => {
            const topicQuestions = SUGGESTED_QUESTIONS.filter(q => 
              q.toLowerCase().includes(topic.toLowerCase())
            );
            return topicQuestions.length > 0 ? 
              topicQuestions[Math.floor(Math.random() * topicQuestions.length)] : 
              `What are the best practices for ${topic} in food safety?`;
          });
          
          setSuggestedQuestions(newSuggestions);
        }
        
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { role: "assistant", content: response }
          ]);
          setLoading(false);
        }, 1000);
        return;
      }
      
      const lowercaseMessage = userMessage.toLowerCase();
      
      let bestMatch = null;
      let bestMatchKey = null;
      let highestScore = 0;
      
      Object.keys(DEMO_RESPONSES).forEach(key => {
        if (key !== 'default' && lowercaseMessage.includes(key)) {
          const score = key.length / lowercaseMessage.length;
          if (score > highestScore) {
            highestScore = score;
            bestMatchKey = key;
            bestMatch = DEMO_RESPONSES[key];
          }
        }
      });
      
      let responseContent = bestMatch;
      
      if (!responseContent) {
        if (lowercaseMessage.includes("?")) {
          responseContent = "That's a great question about food safety! While I'm running in demo mode, I have information about temperature control, cross-contamination, storage practices, HACCP principles, cleaning procedures, pest control, and personal hygiene. Which of these areas are you interested in?";
        } else if (lowercaseMessage.includes("thank")) {
          responseContent = "You're welcome! If you have more questions about food safety inspections, feel free to ask.";
        } else if (lowercaseMessage.length < 10) {
          responseContent = "I'd be happy to help with food safety information. Could you please provide more details about what you'd like to know?";
        } else {
          responseContent = "I understand you're interested in food safety. In demo mode, I can help with information about temperature control, cross-contamination, food storage, HACCP principles, cleaning procedures, pest control, and personal hygiene standards.";
        }
      }
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: responseContent }
        ]);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error in demo message handling:", error);
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { 
            role: "assistant", 
            content: "I apologize, but I encountered an issue while searching for information. Please try asking a different question about food safety inspections." 
          }
        ]);
        setLoading(false);
      }, 800);
    }
  };
  
  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setInput("");
    
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    setLoading(true);
    
    if (mode === 'web' || mode === 'demo') {
      await handleDemoMessage(userMessage);
      return;
    }
    
    if (mode === 'api') {
      try {
        let apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        
        if (!apiKey) {
          apiKey = HARDCODED_API_KEY;
        }
        
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              { 
                role: "system", 
                content: "You are a helpful assistant for SafeTrack, a food safety inspection application. Provide concise and relevant answers about food safety, regulations, inspection procedures, and best practices." 
              },
              ...messages.map(msg => ({ role: msg.role, content: msg.content })),
              { role: "user", content: userMessage }
            ]
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`
            }
          }
        );
        
        const assistantResponse = response.data.choices[0].message.content;
        setMessages(prev => [
          ...prev, 
          { role: "assistant", content: assistantResponse }
        ]);
      } catch (error) {
        console.error("Error in sending message:", error);
        
        let errorMessage = "I'm having trouble connecting to OpenAI. Switching to web search mode to assist you.";
        setMode('web');
        
        setMessages(prev => [
          ...prev, 
          { role: "assistant", content: errorMessage }
        ]);
        
        await handleDemoMessage(userMessage);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSuggestedQuestion = (question) => {
    setInput(question);
  };
  
  const renderMessages = () => {
    return messages.map((message, index) => (
      <Box 
        key={index} 
        sx={{ 
          display: 'flex', 
          justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
          mb: 2 
        }}
      >
        {message.role === 'assistant' && (
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main', 
              width: 36, 
              height: 36, 
              mr: 1,
              mt: 0.5
            }}
          >
            <SmartToyIcon fontSize="small" />
          </Avatar>
        )}
        
        <Paper 
          elevation={1} 
          sx={{
            p: 2,
            maxWidth: '70%',
            borderRadius: 2,
            bgcolor: message.role === 'user' ? 'primary.main' : 'background.paper',
            color: message.role === 'user' ? 'white' : 'text.primary',
            position: 'relative',
            '&::after': message.role === 'user' ? {
              content: '""',
              position: 'absolute',
              right: 0,
              top: 10,
              width: 0,
              height: 0,
              border: '8px solid transparent',
              borderLeftColor: 'primary.main',
              borderRight: 0,
              marginRight: -8
            } : {}
          }}
        >
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {message.content}
          </Typography>
        </Paper>
        
        {message.role === 'user' && (
          <Avatar 
            sx={{ 
              bgcolor: 'grey.300', 
              width: 36, 
              height: 36, 
              ml: 1,
              mt: 0.5
            }}
          >
            <PersonIcon fontSize="small" />
          </Avatar>
        )}
      </Box>
    ));
  };
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        maxWidth: '1000px',
        mx: 'auto',
        p: 3
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
      >
        SafeTrack AI Assistant
      </Typography>
      
      {mode === 'web' && (
        <Alert 
          severity="info" 
          sx={{ mb: 3 }}
        >
          I'm using web search to find food safety information. Ask me anything about food safety regulations, inspections, or best practices.
        </Alert>
      )}
      
      {mode === 'demo' && (
        <Alert 
          severity="info" 
          sx={{ mb: 3 }}
        >
          Running in enhanced demo mode with food safety expertise. Ask me about inspection procedures, safety protocols, and compliance requirements.
        </Alert>
      )}
      
      <Box 
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          bgcolor: 'background.default', 
          p: 2, 
          borderRadius: 2,
          mb: 2,
          minHeight: '500px',
          maxHeight: '500px',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
        }}
      >
        {renderMessages()}
        <div ref={messagesEndRef} />
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={30} />
          </Box>
        )}
      </Box>
      
      {suggestedQuestions.length > 0 && (
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {suggestedQuestions.map((question, index) => (
            <Chip
              key={index}
              label={question}
              onClick={() => handleSuggestedQuestion(question)}
              color="primary"
              variant="outlined"
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                }
              }}
            />
          ))}
        </Box>
      )}
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={3}
          disabled={loading || mode === 'loading'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  onClick={handleSendMessage} 
                  disabled={!input.trim() || loading || mode === 'loading'}
                  color="primary"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Chip 
          label={mode === 'api' ? "Connected to OpenAI" : mode === 'web' ? "Web Search Mode" : mode === 'demo' ? "Demo Mode" : "Connecting..."}
          color={mode === 'api' ? "success" : mode === 'web' ? "info" : mode === 'demo' ? "primary" : "default"}
          size="small" 
          icon={<SmartToyIcon fontSize="small" />} 
        />
      </Box>
    </Box>
  );
};

export default Chatbot;