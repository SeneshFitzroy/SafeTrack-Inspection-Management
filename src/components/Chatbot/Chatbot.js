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
  Link,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  AppBar,
  Toolbar,
  Tooltip,
  Menu,
  MenuItem,
  Fade
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsightsIcon from '@mui/icons-material/Insights';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
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

// Enhanced knowledge base with more comprehensive responses
const ENHANCED_KNOWLEDGE_BASE = {
  greeting: `Welcome to SafeTrack AI! I'm your comprehensive food safety assistant with expertise in:

• FDA Food Code regulations and compliance
• HACCP principles and implementation
• Temperature control and monitoring
• Cross-contamination prevention
• Allergen management
• Sanitation procedures and verification
• Inspection preparation and compliance
• Documentation and record-keeping best practices
• Employee training requirements
• Foodborne illness investigation and prevention

How can I assist with your food safety needs today?`,

  temperature_control: `Temperature control is the cornerstone of food safety, with these critical requirements:

• Cold foods must stay at or below 41°F (5°C)
• Hot foods must remain at or above 135°F (57.2°C)
• The temperature danger zone (41°F-135°F) should be minimized to prevent bacterial growth
• TCS foods should not remain in the danger zone for more than 4 cumulative hours
• Cooking temperatures vary by food type:
  - Poultry: 165°F (74°C)
  - Ground meat: 155°F (68°C)
  - Seafood and whole cuts of meat: 145°F (63°C)
  - Fruits/Vegetables (hot holding): 135°F (57°C)
• Cooling requirements: 135°F to 70°F within 2 hours, then 70°F to 41°F within 4 additional hours
• Reheating must reach 165°F (74°C) within 2 hours

Would you like specific information about temperature monitoring procedures or equipment calibration?`,

  cross_contamination: `Cross-contamination prevention requires multiple control strategies:

• Implement color-coded systems for surfaces, tools, and equipment:
  - Red: Raw meat
  - Yellow: Raw poultry
  - Green: Produce
  - Blue: Seafood
  - White: Dairy and ready-to-eat foods
  - Brown: Cooked foods
• Store raw animal products below ready-to-eat foods
• Design workflow to prevent raw and cooked food crossing paths
• Establish separate preparation areas for different food types
• Use dedicated equipment for allergen-free preparation
• Implement hand hygiene protocols between handling different food types
• Apply proper cleaning and sanitizing procedures between tasks
• Train staff on cross-contamination risks and prevention strategies

Would you like me to elaborate on any specific cross-contamination control measure?`,

  allergen_management: `Food allergen management is critical for consumer safety:

• The "Big 9" allergens requiring special handling include:
  - Milk
  - Eggs
  - Fish
  - Crustacean shellfish
  - Tree nuts
  - Peanuts
  - Wheat
  - Soybeans
  - Sesame (newest addition)
• Implement allergen-specific controls:
  - Dedicated storage areas
  - Color-coded tools and equipment
  - Scheduled production (allergen-free first)
  - Thorough cleaning and verification between allergens
  - Staff training on allergen hazards and symptoms
• Maintain comprehensive documentation:
  - Ingredient lists
  - Allergen matrices for menu items
  - Cleaning validation records
  - Staff training records
• Consumer-facing controls:
  - Clear menu labeling
  - Staff knowledgeable about ingredients
  - Protocol for handling special allergen requests

Would you like information about best practices for preventing allergen cross-contact?`
};

// Expanded demo responses with more comprehensive topics
const DEMO_RESPONSES = {
  "hello": ENHANCED_KNOWLEDGE_BASE.greeting,
  "hi": ENHANCED_KNOWLEDGE_BASE.greeting,
  "hey": ENHANCED_KNOWLEDGE_BASE.greeting,
  "greetings": ENHANCED_KNOWLEDGE_BASE.greeting,
  "temperature": ENHANCED_KNOWLEDGE_BASE.temperature_control,
  "cross contamination": ENHANCED_KNOWLEDGE_BASE.cross_contamination,
  "allergen": ENHANCED_KNOWLEDGE_BASE.allergen_management,
  "default": "I'm currently running in demo mode with limited responses. For full AI functionality, connect with your OpenAI API key."
};

// Extended suggested questions with more diverse topics
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
  "What are the best practices for employee food safety training and verification?",
  "How should a restaurant handle a suspected foodborne illness complaint?",
  "What are the proper procedures for sanitizing food contact surfaces?",
  "How should a food establishment prepare for an unannounced health inspection?",
  "What are the requirements for a food recall plan?",
  "How should temperature logs be maintained and verified for regulatory compliance?",
  "What are the most effective methods for cooling hot foods safely?",
  "How should cleaning chemicals be stored in a food establishment?",
  "What personal protective equipment should be used in food preparation areas?",
  "How can digital tools improve food safety compliance and documentation?",
  "What are the regulatory requirements for employee health and hygiene training?"
];

// Expanded categorized question suggestions with more topics
const QUESTION_CATEGORIES = [
  {
    name: "Temperature Control",
    icon: "🌡️",
    color: "#f44336",
    questions: [
      "What are the critical temperature control points in a food establishment?",
      "What is the proper temperature range for cold food storage?",
      "How should hot food be maintained during service?",
      "What's the maximum time food can stay in the temperature danger zone?",
      "How often should temperature logs be updated during food service?",
      "What are the proper procedures for cooling hot foods safely?",
      "How should thermometers be calibrated for accurate readings?"
    ]
  },
  {
    name: "Sanitation",
    icon: "🧼",
    color: "#2196f3",
    questions: [
      "What are the proper sanitizing procedures for food contact surfaces?",
      "How often should sanitizing solutions be changed?",
      "What's the correct concentration for chlorine sanitizer?",
      "What are the steps for a proper three-compartment sink process?",
      "How should cleaning tools be stored and maintained?",
      "What's the difference between cleaning, sanitizing, and disinfecting?",
      "How should establishments validate their sanitation procedures?"
    ]
  },
  {
    name: "Cross Contamination",
    icon: "⚠️",
    color: "#ff9800",
    questions: [
      "How can we prevent cross-contamination in food preparation areas?",
      "What color-coding systems should be used for cutting boards?",
      "How should raw meat be stored in relation to ready-to-eat foods?",
      "What are best practices for preventing allergen cross-contact?",
      "How should utensils be handled to prevent cross-contamination?",
      "What workflow processes minimize cross-contamination risks?",
      "How should food handlers change tasks to avoid contamination?"
    ]
  },
  {
    name: "Inspection Process",
    icon: "📋",
    color: "#4caf50",
    questions: [
      "What are inspectors looking for during a routine food safety inspection?",
      "How should we prepare for an upcoming health inspection?",
      "What documentation should we have ready for inspectors?",
      "How are risk-based inspections different from routine inspections?",
      "What rights do establishments have during an inspection?",
      "How should corrective actions be documented after an inspection?",
      "What's the process for contesting an inspection violation?"
    ]
  },
  {
    name: "Allergens",
    icon: "🥜",
    color: "#9c27b0",
    questions: [
      "What are the big 8 food allergens that must be tracked?",
      "How should allergen-containing ingredients be stored?",
      "What protocols should be followed for allergen cleaning?",
      "How should menus communicate allergen information?",
      "What training should staff receive about food allergens?",
      "How should special allergen orders be handled in the kitchen?",
      "What documentation is needed for allergen control programs?"
    ]
  },
  {
    name: "Documentation",
    icon: "📝",
    color: "#795548",
    questions: [
      "What essential records must food establishments maintain?",
      "How long should different types of food safety records be kept?",
      "What information should be included in cleaning logs?",
      "How detailed should temperature monitoring records be?",
      "What's the best system for organizing food safety documents?",
      "How can digital tools improve documentation compliance?",
      "What documents are most frequently requested during inspections?"
    ]
  }
];

// Use a consistent hard-coded API key for all users
const HARDCODED_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || ''; // Rely on environment variable only

// Enhanced comprehensive knowledge base with expanded capabilities
const performWebSearch = async (query) => {
  try {
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
    };

    const anyFoodSafetyRelated = /food|safety|inspection|health|sanitation|restaurant|cafe|kitchen|hygiene|contamination|regulation|compliance|violation|temperature|haccp|allergen|pest|clean|sanitize/i.test(query);

    if (anyFoodSafetyRelated) {
      const relevantTopics = Object.keys(searchResults).filter(topic => 
        query.toLowerCase().includes(topic)
      );

      if (relevantTopics.length > 0) {
        const topResult = searchResults[relevantTopics[0]];
        return {
          found: true,
          title: topResult.title,
          content: topResult.content,
          url: topResult.url,
          relatedTopics: getRelatedTopics(relevantTopics[0])
        };
      }
    }

    return {
      found: true,
      title: "Food Safety Information",
      content: "As a specialized food safety assistant, I can help with questions about food safety inspections, regulations, compliance, and best practices. Some topics I can assist with include temperature control, cross-contamination prevention, hygiene requirements, and more.",
      url: "https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/retail-food-protection",
      relatedTopics: ["inspection", "haccp", "temperature", "cleaning"]
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
  };
  
  return topicRelations[currentTopic] || ["inspection", "haccp", "sanitation"];
};

// Add document processing function
const processDocument = async (documentText) => {
  const topics = [];
  
  if (/temperature|degree|fahrenheit|celsius|cold|hot|cook|cool/i.test(documentText)) {
    topics.push("temperature control");
  }
  
  if (/clean|sanit|disinfect|wash|detergent|soap|chemical/i.test(documentText)) {
    topics.push("cleaning and sanitizing");
  }
  
  if (/employee|staff|personnel|hygiene|hand|wash|restroom/i.test(documentText)) {
    topics.push("employee hygiene");
  }
  
  const analysisResult = {
    documentSummary: "Document appears to be related to food safety procedures and contains information about " + 
      (topics.length > 0 ? topics.join(", ") : "general food safety"),
    recommendedResources: [],
    relevantRegulations: []
  };
  
  topics.forEach(topic => {
    if (topic === "temperature control") {
      analysisResult.recommendedResources.push({
        title: "FDA Food Code Temperature Requirements",
        url: "https://www.fda.gov/food/fda-food-code/food-code-2022"
      });
      analysisResult.relevantRegulations.push("FDA Food Code Chapter 3-4: Destruction of Organisms of Public Health Concern");
    }
    
    if (topic === "cleaning and sanitizing") {
      analysisResult.recommendedResources.push({
        title: "CDC Cleaning and Sanitizing Guidelines",
        url: "https://www.cdc.gov/foodsafety/communication/clean-sanitize.html"
      });
      analysisResult.relevantRegulations.push("FDA Food Code Chapter 4-6: Cleaning of Equipment and Utensils");
    }
    
    if (topic === "employee hygiene") {
      analysisResult.recommendedResources.push({
        title: "FDA Employee Health and Personal Hygiene Handbook",
        url: "https://www.fda.gov/food/retail-food-industryregulatory-assistance-training/retail-food-protection-employee-health-and-personal-hygiene-handbook"
      });
      analysisResult.relevantRegulations.push("FDA Food Code Chapter 2-4: Employee Responsibilities");
    }
  });
  
  return analysisResult;
};

// Add a function to analyze application data and provide insights
const analyzeAppData = async (dataType, params = {}) => {
  const mockAnalyses = {
    "inspection_trends": {
      title: "Inspection Trends Analysis",
      content: "Based on inspection data in the SafeTrack system:\n\n• Critical violations have decreased by 23% over the past quarter\n• Temperature control issues remain the most common violation category (42% of all citations)\n• Establishments with regular internal audits show 68% fewer critical violations",
      insights: [
        "Focus training efforts on temperature control procedures",
        "Schedule more inspections during morning hours when possible",
        "Expand the educational materials program to more establishments"
      ]
    },
    "risk_assessment": {
      title: "Establishment Risk Assessment",
      content: "Risk assessment analysis from SafeTrack data shows:\n\n• 12% of establishments currently fall in high-risk category\n• 65% medium risk establishments have improved to low risk within 6 months with proper guidance\n• Risk factors most predictive of violations include poor active managerial control and inadequate employee training",
      insights: [
        "Implement targeted intervention program for the 12% high-risk establishments",
        "Develop specialized managerial control training module",
        "Increase inspection frequency during summer months"
      ]
    },
    "compliance_metrics": {
      title: "Compliance Performance Metrics",
      content: "Compliance metrics in the SafeTrack system indicate:\n\n• Overall compliance rate is currently 78.3% across all establishments\n• Fast improvement seen in establishments using the SafeTrack mobile app (42% reduction in violations)\n• Common correction time metrics for critical violations: 5.3 days average correction time",
      insights: [
        "Expand mobile app adoption to more establishments",
        "Strengthen verification follow-up procedures",
        "Create incentive program for self-reporting"
      ]
    }
  };
  
  if (dataType in mockAnalyses) {
    return mockAnalyses[dataType];
  }
  
  return {
    title: "SafeTrack System Overview",
    content: "SafeTrack system currently contains 1,247 registered food establishments, 5,823 completed inspections, and shows a 78.3% overall compliance rate.",
    insights: [
      "System data shows strong correlation between regular training and reduced violations",
      "Digital documentation tools have significantly improved compliance tracking",
      "Risk-based inspection scheduling has optimized inspector resource allocation"
    ]
  };
};

// Enhance the handleDemoMessage function to provide more comprehensive responses
const handleDemoMessage = async (userMessage) => {
  try {
    const searchResult = await performWebSearch(userMessage);

    // Enhanced knowledge-based response system
    const lowercaseMessage = userMessage.toLowerCase();
    
    // Check for greeting patterns
    if (/^(hello|hi|hey|greetings|good (morning|afternoon|evening)|hola)/i.test(lowercaseMessage)) {
      return ENHANCED_KNOWLEDGE_BASE.greeting;
    }
    
    // Enhanced keyword matching with multiple levels of analysis
    let bestMatchKey = null;
    let bestMatchScore = 0;
    let secondaryMatches = [];
    
    // Primary match - exact phrase matching
    Object.keys(DEMO_RESPONSES).forEach(key => {
      if (key !== 'default') {
        // Exact match has highest priority
        if (lowercaseMessage.includes(key)) {
          const score = (key.length / lowercaseMessage.length) * 2; // Weight exact matches higher
          if (score > bestMatchScore) {
            bestMatchScore = score;
            bestMatchKey = key;
          }
        }
        
        // Look for related terms using semantic matching
        const keyTerms = key.split(/\s+/);
        let termMatches = 0;
        
        keyTerms.forEach(term => {
          if (term.length > 3 && lowercaseMessage.includes(term)) {
            termMatches++;
          }
        });
        
        if (termMatches > 0) {
          const relevanceScore = termMatches / keyTerms.length;
          secondaryMatches.push({ key, score: relevanceScore });
        }
      }
    });
    
    // If we have a strong primary match, use it
    if (bestMatchKey && bestMatchScore > 0.15) {
      return DEMO_RESPONSES[bestMatchKey];
    }
    
    // Otherwise if we have web search results, use them
    if (searchResult.found) {
      // Enhanced formatting for web search results
      return `# ${searchResult.title}

${searchResult.content}

**Source:** [FDA Food Safety Information](${searchResult.url})

**Related Topics:** ${searchResult.relatedTopics.map(topic => `\`${topic}\``).join(', ')}

Would you like more specific information about any of these topics?`;
    }
    
    // If we have secondary matches, combine their information for a comprehensive response
    if (secondaryMatches.length > 0) {
      // Sort by score and take top 2 matches for combined response
      secondaryMatches.sort((a, b) => b.score - a.score);
      const topMatches = secondaryMatches.slice(0, 2);
      
      let combinedResponse = `Based on your question about ${topMatches.map(m => `"${m.key}"`).join(' and ')}, here's what I can tell you:\n\n`;
      
      topMatches.forEach(match => {
        combinedResponse += `## Regarding ${match.key}:\n${DEMO_RESPONSES[match.key]}\n\n`;
      });
      
      combinedResponse += "Would you like more specific information about either of these topics?";
      
      return combinedResponse;
    }
    
    // For questions, give a customized response
    if (lowercaseMessage.includes("?")) {
      return `That's an excellent question about food safety! 

I have comprehensive information on:
• Temperature control and monitoring
• Cross-contamination prevention
• Cleaning and sanitizing procedures
• HACCP implementation
• Allergen management
• Regulatory compliance
• Inspection preparation
• Employee training requirements
• Documentation best practices
• Foodborne illness prevention

Could you provide more specific details about what aspect of food safety you're interested in?`;
    }
    
    // Fall back to default
    return DEMO_RESPONSES.default;
  } catch (error) {
    console.error("Error in demo message handling:", error);
    return "I apologize, but I encountered an issue while searching for information. Please try asking a different question about food safety inspections.";
  }
};

// Implement the Chatbot component
const Chatbot = () => {
  const [mode, setMode] = useState('loading'); // 'loading', 'api', 'demo', 'web'
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [fileContent, setFileContent] = useState(null);
  const [fileProcessing, setFileProcessing] = useState(false);
  const [showDataInsights, setShowDataInsights] = useState(false);
  const [dataInsightType, setDataInsightType] = useState('inspection_trends');
  const fileInputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false); // Add missing state for mobile detection
  const [anchorEl, setAnchorEl] = useState(null);
  const [suggestionsAnchorEl, setSuggestionsAnchorEl] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [animateNewMessage, setAnimateNewMessage] = useState(false);
  const [displayQuestionCount, setDisplayQuestionCount] = useState(5); // Show 5 questions instead of 3

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSuggestionsOpen = (event) => {
    setSuggestionsAnchorEl(event.currentTarget);
  };

  const handleSuggestionsClose = () => {
    setSuggestionsAnchorEl(null);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setLoading(true);
    
    const welcomeDismissed = localStorage.getItem('chatbot_welcome_dismissed');
    if (welcomeDismissed) {
      setShowWelcomeScreen(false);
    }

    const allQuestions = QUESTION_CATEGORIES.flatMap(cat => cat.questions);
    const randomQuestions = [...allQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, displayQuestionCount); // Use the new count variable
    
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
  }, [displayQuestionCount]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    setTypingIndicator(true);
    setLoading(true);

    setTimeout(() => {
      scrollToBottom();
    }, 100);

    if (mode === 'web' || mode === 'demo') {
      try {
        const response = await handleDemoMessage(userMessage);
        
        setTimeout(() => {
          setTypingIndicator(false);
          
          setAnimateNewMessage(true);
          setMessages(prev => [
            ...prev,
            { role: "assistant", content: response, isNew: true }
          ]);
          
          setTimeout(() => {
            setAnimateNewMessage(false);
          }, 500);
          
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error in demo message handling:", error);
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: "I apologize, but I encountered an issue. Please try asking a different question." }
        ]);
        setLoading(false);
      }
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
    handleSuggestionsClose();
  };
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setFileProcessing(true);
    
    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const text = e.target.result;
        setFileContent(text);
        
        const documentAnalysis = await processDocument(text);
        setMessages(prev => [
          ...prev,
          { 
            role: "assistant", 
            content: `I've analyzed your document about ${documentAnalysis.documentSummary}.\n\n**Recommended Resources:**\n${documentAnalysis.recommendedResources.map(r => `• [${r.title}](${r.url})`).join('\n')}\n\n**Relevant Regulations:**\n${documentAnalysis.relevantRegulations.map(r => `• ${r}`).join('\n')}\n\nWould you like me to explain any specific aspect of these regulations in more detail?`
          }
        ]);
        
        const newSuggestions = documentAnalysis.recommendedResources.map(r => 
          `What are the requirements for ${r.title.split(' ').slice(-2).join(' ')}?`
        );
        setSuggestedQuestions(newSuggestions);
        
        setFileProcessing(false);
      };
      reader.readAsText(file);
    } catch (error) {
      console.error("Error processing file:", error);
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: "I'm sorry, I encountered an error processing your document. Please try uploading a text-based document (PDF, TXT, DOC)."
        }
      ]);
      setFileProcessing(false);
    }
  };

  const handleDataInsightRequest = async (type) => {
    setDataInsightType(type);
    setShowDataInsights(true);
    setLoading(true);
    
    try {
      const analysisResult = await analyzeAppData(type);
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: `**${analysisResult.title}**\n\n${analysisResult.content}\n\n**Key Insights:**\n${analysisResult.insights.map((insight, i) => `${i+1}. ${insight}`).join('\n')}`
        }
      ]);
      
      const newSuggestions = [
        `How can we improve ${type.replace('_', ' ')} further?`,
        `What are the best practices for addressing ${analysisResult.title.toLowerCase()}?`,
        `What regulatory requirements apply to these ${type.replace('_', ' ')}?`
      ];
      setSuggestedQuestions(newSuggestions);
    } catch (error) {
      console.error("Error analyzing app data:", error);
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "I'm sorry, I encountered an error analyzing the application data. Please try again." }
      ]);
    } finally {
      setLoading(false);
      setShowDataInsights(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSuggestedQuestions(QUESTION_CATEGORIES.find(cat => cat.name === category).questions);
  };

  const clearCategory = () => {
    setSelectedCategory(null);
    const allQuestions = QUESTION_CATEGORIES.flatMap(cat => cat.questions);
    const randomQuestions = [...allQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, displayQuestionCount); // Use the new count variable
    setSuggestedQuestions(randomQuestions);
  };

  const dismissWelcomeScreen = () => {
    setShowWelcomeScreen(false);
    localStorage.setItem('chatbot_welcome_dismissed', 'true');
  };

  const renderMessages = () => {
    if (messages.length === 0 && showWelcomeScreen) {
      return renderWelcomeScreen();
    }
    
    return messages.map((message, index) => (
      <Box 
        key={index} 
        sx={{ 
          display: 'flex', 
          justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
          mb: 2.5,
          opacity: message.isNew && animateNewMessage ? 0 : 1,
          transform: message.isNew && animateNewMessage ? 'translateY(20px)' : 'translateY(0)',
          transition: 'all 0.3s ease-out',
          animation: message.isNew ? 'slideUp 0.4s ease-out' : 'none'
        }}
      >
        {message.role === 'assistant' && (
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main', 
              width: 42, 
              height: 42, 
              mr: 1.5, 
              mt: 0.5,
              boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
              border: '2px solid white'
            }}
          >
            <SmartToyIcon fontSize="small" />
          </Avatar>
        )}
        
        <Paper 
          elevation={message.role === 'user' ? 2 : 1}
          sx={{
            p: 2,
            maxWidth: '75%',
            borderRadius: message.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
            bgcolor: message.role === 'user' ? 'primary.main' : 'background.paper',
            color: message.role === 'user' ? 'white' : 'text.primary',
            boxShadow: message.role === 'user' 
              ? '0 3px 10px rgba(25,118,210,0.15)' 
              : '0 2px 8px rgba(0,0,0,0.06)',
            position: 'relative',
            borderLeft: message.role === 'assistant' ? '3px solid' : 'none',
            borderColor: message.role === 'assistant' ? 'primary.light' : 'none',
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
          <Typography 
            variant="body1" 
            sx={{ 
              whiteSpace: 'pre-wrap',
              lineHeight: 1.6,
              letterSpacing: 0.2
            }}
          >
            {message.content}
          </Typography>
        </Paper>
        
        {message.role === 'user' && (
          <Avatar 
            sx={{ 
              bgcolor: 'grey.200', 
              width: 42, 
              height: 42, 
              ml: 1.5, 
              mt: 0.5,
              boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
              border: '2px solid white'
            }}
          >
            <PersonIcon fontSize="small" color="primary" />
          </Avatar>
        )}
      </Box>
    ));
  };

  const renderWelcomeScreen = () => (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100%',
        p: 3,
        background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(25,118,210,0.05) 100%)'
      }}
    >
      <Avatar 
        sx={{ 
          bgcolor: 'primary.main', 
          width: 90, 
          height: 90,
          mb: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          animation: 'pulse 2s infinite',
          transition: 'all 0.3s',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}
      >
        <SmartToyIcon sx={{ fontSize: 45 }} />
      </Avatar>
      
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 2, 
          fontWeight: 700,
          background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Welcome to SafeTrack AI Assistant
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, maxWidth: 650, color: 'text.secondary', lineHeight: 1.6 }}>
        I'm your intelligent food safety companion! Ask me about regulations, inspection procedures, 
        compliance requirements, best practices, or any food safety topic you need help with.
      </Typography>
      
      <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600 }}>
        Choose a topic to get started:
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 2.5, 
        justifyContent: 'center', 
        mb: 4, 
        maxWidth: 1000 
      }}>
        {QUESTION_CATEGORIES.map((category) => (
          <Paper
            key={category.name}
            elevation={4}
            sx={{
              p: 2.5,
              width: { xs: '100%', sm: 240 },
              borderRadius: 3,
              cursor: 'pointer',
              transition: 'all 0.3s',
              borderLeft: `4px solid ${category.color}`,
              background: `linear-gradient(to right, rgba(${category.color.replace('#', '').match(/../g).map(h => parseInt(h, 16)).join(',')},0.04) 0%, rgba(255,255,255,1) 100%)`,
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                background: `linear-gradient(to right, rgba(${category.color.replace('#', '').match(/../g).map(h => parseInt(h, 16)).join(',')},0.08) 0%, rgba(255,255,255,1) 100%)`,
              }
            }}
            onClick={() => {
              handleCategorySelect(category.name);
              dismissWelcomeScreen();
            }}
          >
            <Typography variant="h6" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', fontWeight: 600 }}>
              <Box component="span" sx={{ 
                mr: 1.5, 
                fontSize: '24px',
                p: 1,
                borderRadius: '50%',
                bgcolor: `${category.color}15`,
                display: 'flex'
              }}>{category.icon}</Box>
              {category.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
              {category.questions[0].split('?')[0]}?
            </Typography>
          </Paper>
        ))}
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          onClick={() => {
            setInput(SUGGESTED_QUESTIONS[Math.floor(Math.random() * SUGGESTED_QUESTIONS.length)]);
            dismissWelcomeScreen();
          }}
          sx={{ 
            borderRadius: 28, 
            px: 3, 
            py: 1.2,
            boxShadow: '0 4px 10px rgba(25,118,210,0.3)',
            '&:hover': {
              boxShadow: '0 6px 15px rgba(25,118,210,0.4)',
            }
          }}
        >
          Ask Random Question
        </Button>
        <Button 
          variant="outlined" 
          onClick={dismissWelcomeScreen}
          sx={{ 
            borderRadius: 28, 
            px: 3,
            py: 1.2,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
            }
          }}
        >
          Start Fresh
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box 
      sx={{ 
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, rgba(25,118,210,0.02), rgba(255,255,255,1) 120px)'
      }}
    >
      <AppBar 
        position="static" 
        color="default" 
        elevation={0}
        sx={{ 
          borderBottom: '1px solid', 
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                bgcolor: 'primary.main', 
                width: 36, 
                height: 36,
                mr: 1.5,
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              <SmartToyIcon fontSize="small" />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              SafeTrack AI Assistant
            </Typography>
          </Box>
          
          {!showWelcomeScreen && (
            <Box 
              sx={{ 
                ml: 2, 
                display: { xs: 'none', md: 'flex' }, 
                gap: 1, 
                overflow: 'auto',
                maxWidth: '40%',
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
              }}
            >
              {QUESTION_CATEGORIES.map((category) => (
                <Chip
                  key={category.name}
                  label={category.name}
                  icon={<span style={{ fontSize: '14px', marginLeft: '8px' }}>{category.icon}</span>}
                  onClick={() => handleCategorySelect(category.name)}
                  color={selectedCategory === category.name ? "primary" : "default"}
                  variant={selectedCategory === category.name ? "filled" : "outlined"}
                  sx={{ 
                    borderRadius: '16px',
                    '&:hover': { bgcolor: selectedCategory === category.name ? '' : 'rgba(0,0,0,0.04)' }
                  }}
                />
              ))}
              
              {selectedCategory && (
                <Chip
                  label="Clear"
                  size="small"
                  onClick={clearCategory}
                  color="default"
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
          )}
          
          <Box sx={{ ml: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip 
              label={mode === 'api' ? "AI Powered" : mode === 'web' ? "Web Search" : "Demo Mode"}
              color={mode === 'api' ? "success" : mode === 'web' ? "info" : "default"}
              size="small"
              icon={<SmartToyIcon style={{ fontSize: '0.8rem' }} />}
              sx={{ mr: 1, borderRadius: '16px' }}
            />
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Tooltip title="Upload Document">
                <IconButton 
                  color="primary"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                  disabled={fileProcessing}
                  sx={{ 
                    bgcolor: 'rgba(25, 118, 210, 0.05)',
                    '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.15)' } 
                  }}
                >
                  <UploadFileIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Data Insights">
                <IconButton 
                  color="primary"
                  onClick={() => handleDataInsightRequest('inspection_trends')}
                  sx={{ 
                    bgcolor: 'rgba(25, 118, 210, 0.05)',
                    '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.15)' } 
                  }}
                >
                  <InsightsIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Suggested Questions">
                <IconButton 
                  color="primary"
                  onClick={handleSuggestionsOpen}
                  sx={{ 
                    bgcolor: 'rgba(25, 118, 210, 0.05)',
                    '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.15)' } 
                  }}
                >
                  <LightbulbIcon />
                </IconButton>
              </Tooltip>
            </Box>
            
            <IconButton
              color="inherit"
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              sx={{ display: { md: 'none' } }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 64px)',
          overflow: 'hidden',
          bgcolor: '#f8fafd',
          background: 'linear-gradient(to top, rgba(25,118,210,0.03), rgba(255,255,255,1) 300px)'
        }}
      >
        <Box 
          ref={chatContainerRef}
          sx={{ 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: { xs: 1, sm: 2 },
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Box 
            sx={{ 
              flexGrow: 1, 
              overflow: 'auto',
              height: 'calc(100% - 100px)',
              p: 1,
              '&::-webkit-scrollbar': { width: '6px' },
              '&::-webkit-scrollbar-track': { background: 'rgba(0,0,0,0.02)' },
              '&::-webkit-scrollbar-thumb': { background: 'rgba(0,0,0,0.1)', borderRadius: '3px' }
            }}
          >
            {renderMessages()}
            <div ref={messagesEndRef} />
            
            {typingIndicator && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mt: 2, 
                  animation: 'fadeIn 0.3s ease-in'
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    width: 42, 
                    height: 42, 
                    mr: 1.5,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
                    border: '2px solid white'
                  }}
                >
                  <SmartToyIcon fontSize="small" />
                </Avatar>
                <Paper
                  elevation={1}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: '4px 18px 18px 18px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.8,
                    borderLeft: '3px solid',
                    borderColor: 'primary.light',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      animation: 'bounce 1.4s infinite ease-in-out 0s'
                    }}
                  />
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      animation: 'bounce 1.4s infinite ease-in-out 0.2s'
                    }}
                  />
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      animation: 'bounce 1.4s infinite ease-in-out 0.4s'
                    }}
                  />
                </Paper>
              </Box>
            )}
            
            {loading && !typingIndicator && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CircularProgress size={24} />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {fileProcessing ? "Processing document..." : "Thinking..."}
                </Typography>
              </Box>
            )}
          </Box>
          
          {/* Enhanced suggested questions section with more suggestions and better UI */}
          {suggestedQuestions.length > 0 && !showWelcomeScreen && (
            <Box
              sx={{
                py: 1.8,
                px: 2.5,
                borderTop: '2px solid rgba(25,118,210,0.08)',
                background: 'linear-gradient(to bottom, rgba(25,118,210,0.03), rgba(0,0,0,0))',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: 'primary.main', 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.85rem'
                  }}
                >
                  <LightbulbIcon fontSize="small" sx={{ mr: 0.8 }} />
                  Suggested Questions
                </Typography>
                
                <Button 
                  size="small" 
                  onClick={() => {
                    const allQuestions = QUESTION_CATEGORIES.flatMap(cat => cat.questions);
                    const newRandomQuestions = [...allQuestions]
                      .sort(() => 0.5 - Math.random())
                      .slice(0, displayQuestionCount);
                    setSuggestedQuestions(newRandomQuestions);
                  }}
                  sx={{ 
                    textTransform: 'none', 
                    minWidth: 'auto', 
                    px: 1,
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'rgba(25,118,210,0.08)'
                    }
                  }}
                >
                  Refresh
                </Button>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 1,
                maxHeight: '100px',
                overflowY: 'auto',
                pb: 0.5,
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-track': { background: 'rgba(0,0,0,0.02)' },
                '&::-webkit-scrollbar-thumb': { background: 'rgba(25,118,210,0.2)', borderRadius: '2px' }
              }}>
                {suggestedQuestions.map((question, idx) => (
                  <Chip
                    key={idx}
                    label={question.length > 60 ? question.substring(0, 57) + '...' : question}
                    color="primary"
                    variant="outlined"
                    size="small"
                    clickable
                    onClick={() => handleSuggestedQuestion(question)}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: '16px',
                      px: 1,
                      py: 0.6,
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      borderWidth: 1.5,
                      borderColor: 'rgba(25,118,210,0.3)',
                      '&:hover': {
                        bgcolor: 'rgba(25, 118, 210, 0.08)',
                        transform: 'translateY(-2px) scale(1.01)',
                        boxShadow: '0 3px 8px rgba(25,118,210,0.15)',
                        borderColor: 'primary.main'
                      },
                      transition: 'all 0.2s'
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
            
          {/* Enhanced input area */}
          <Box 
            sx={{ 
              p: 2,
              pt: 1.5,
              borderTop: '1px solid',
              borderColor: 'rgba(0,0,0,0.05)',
              position: 'relative',
              bgcolor: 'background.paper',
              boxShadow: '0 -4px 10px rgba(0,0,0,0.03)'
            }}
          >
            <Paper
              elevation={4} 
              sx={{ 
                p: '0px 16px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '28px',
                boxShadow: '0 3px 15px rgba(25,118,210,0.1)',
                border: '1px solid rgba(25,118,210,0.08)',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(25,118,210,0.15)',
                }
              }}
            >
              <TextField
                fullWidth
                placeholder="Type your message here..."
                multiline
                maxRows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading || mode === 'loading'}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: { 
                    py: 1.5,
                    fontSize: '0.95rem'
                  }
                }}
              />
              
              <IconButton 
                color="primary" 
                onClick={handleSendMessage}
                disabled={!input.trim() || loading || mode === 'loading'}
                sx={{
                  ml: 1,
                  bgcolor: input.trim() ? 'primary.main' : 'action.disabledBackground',
                  color: input.trim() ? 'white' : 'action.disabled',
                  '&:hover': {
                    bgcolor: input.trim() ? 'primary.dark' : 'action.disabledBackground',
                    transform: input.trim() ? 'scale(1.05)' : 'none'
                  },
                  '&.Mui-disabled': {
                    bgcolor: 'action.disabledBackground',
                    color: 'action.disabled'
                  },
                  width: 42,
                  height: 42,
                  transition: 'all 0.2s ease',
                  boxShadow: input.trim() ? '0 2px 6px rgba(25,118,210,0.3)' : 'none'
                }}
              >
                <SendIcon fontSize="small" />
              </IconButton>
            </Paper>
            
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                display: 'block', 
                textAlign: 'center', 
                mt: 1.2,
                opacity: 0.75,
                fontStyle: 'italic'
              }}
            >
              SafeTrack AI Assistant • {mode === 'api' ? 'AI Powered' : mode === 'web' ? 'Web Search' : 'Demo Mode'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* File input element */}
      <input
        type="file"
        accept=".txt,.pdf,.doc,.docx"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileUpload}
      />

      {/* Animation keyframes */}
      <Box
        sx={{
          '@keyframes pulse': {
            '0%': { boxShadow: '0 4px 20px rgba(25,118,210,0.3)' },
            '50%': { boxShadow: '0 4px 25px rgba(25,118,210,0.5)' },
            '100%': { boxShadow: '0 4px 20px rgba(25,118,210,0.3)' },
          },
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-5px)' },
          },
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
          '@keyframes slideUp': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          },
          '@keyframes shimmer': {
            '0%': { backgroundPosition: '-1000px 0' },
            '100%': { backgroundPosition: '1000px 0' }
          }
        }}
      />

      {/* Menus */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => {
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
          handleMenuClose();
        }}>
          <ListItemIcon>
            <UploadFileIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Upload Document</Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          handleDataInsightRequest('inspection_trends');
          handleMenuClose();
        }}>
          <ListItemIcon>
            <InsightsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Data Insights</Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          handleSuggestionsOpen(anchorEl);
          handleMenuClose();
        }}>
          <ListItemIcon>
            <LightbulbIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Suggested Questions</Typography>
        </MenuItem>
      </Menu>
      
      {/* Enhanced Menu for suggested questions */}
      <Menu
        anchorEl={suggestionsAnchorEl}
        open={Boolean(suggestionsAnchorEl)}
        onClose={handleSuggestionsClose}
        TransitionComponent={Fade}
        PaperProps={{
          sx: { 
            width: { xs: 320, sm: 420 }, 
            maxHeight: 400,
            boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(25,118,210,0.1)'
          }
        }}
      >
        <Box sx={{ 
          p: 1.5, 
          bgcolor: 'rgba(25,118,210,0.05)', 
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
            Suggested Questions
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Select any question to ask
          </Typography>
        </Box>
        
        <List sx={{ py: 0.5 }}>
          {suggestedQuestions.map((question, index) => (
            <ListItem 
              key={index} 
              disablePadding
              divider={index < suggestedQuestions.length - 1}
              sx={{
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(25,118,210,0.06)'
                }
              }}
            >
              <ListItemButton onClick={() => handleSuggestedQuestion(question)} dense>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <LightbulbIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={question} 
                  primaryTypographyProps={{ variant: 'body2', noWrap: false, sx: { lineHeight: 1.3 } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Menu>
    </Box>
  );
};

export default Chatbot;