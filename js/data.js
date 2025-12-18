window.portfolioData = {
  hero: {
    name: "George V Jose",
    title: "Machine Learning Researcher",
    tagline: "Safer medical AI through research and deployment",
    description: "Machine-learning engineer and researcher with 3+ years of experience developing datasets, training, testing, and deploying deep-learning models. Currently exploring medical AI safety topics and passionate about bringing cutting-edge research to real-world impact.",
    image: "images/avatar.jpg", 
    resumeUrl: "Resume.pdf",
    social: {
      linkedin: "https://www.linkedin.com/in/george-v-jose-5bb726156/",
      github: "https://github.com/georgevjose",
      medium: "https://medium.com/@GeorgeVJose",
      email: "mailto:jorujose@gmail.com"
    }
  },
  experience: [
    {
      role: "Research Assistant",
      company: "Australian Institute for Machine Learning",
      period: "2025 - Present",
      description: "Dental Point Cloud Analysis",
      highlights: [
        // "Achieved <1mm accuracy on 91% of test landmarks",
        // "Implemented advanced point cloud processing techniques",
        // "Contributed to dental AI research and precision medicine"
      ]
    },
    {
      role: "Research Intern",
      company: "Australian Institute for Machine Learning",
      period: "2024",
      description: "Developed a PointNet++ pipeline to precisely localise dental landmarks on 3D dentition point clouds.",
      highlights: [
        "Achieved <1mm accuracy on 91% of test landmarks",
        "Implemented advanced point cloud processing techniques",
        "Contributed to dental AI research and precision medicine"
      ]
    },
    {
      role: "Project Research Assistant",
      company: "Indian Institute of Technology Bombay",
      period: "2020 - 2023",
      description: "Designed and engineered DRISHT-E, a video-based traffic analytics platform for non-lane-based traffic.",
      highlights: [
        "Curated a drone dataset of ~186k frames with 4M bounding-box annotations",
        "Trained multiple object-detection networks delivering state-of-the-art accuracy",
        "Developed algorithms for traffic analysis in complex, non-lane-based environments"
      ]
    },
  ],
  education: [
    {
      degree: "Masters in Artificial Intelligence and Machine Learning",
      school: "University of Adelaide",
      location: "Adelaide, Australia",
      gpa: "6.625"
    },
    {
      degree: "Bachelor of Engineering in Computer Science and Engineering",
      school: "Rajagiri School of Engineering and Technology",
      location: "Cochin, India",
      gpa: "8.58/10"
    }
  ],
  projects: [
    {
      id: "medical-ai-safety",
      title: "Medical AI Safety: Demography Bias and Fairness",
      subtitle: "Masters Research",
      summary: "Auditing CheXagent's chest X-ray predictions for demographic bias by linking subgroup performance disparities across gender, race, and age to internal model confidence signals.",
      description: `
        <p>This ongoing research audits <strong>CheXagent's</strong> chest X-ray predictions for demographic bias. The goal is to link subgroup performance disparities across gender, race, and age to internal model confidence signals.</p>
        
        <h3>Key Objectives</h3>
        <ul>
          <li>Assess bias dimensions: Gender, Race, Age</li>
          <li>Probe model signals: Vision & decoder confidences</li>
          <li>Develop mitigation strategies for fairer medical AI diagnostics</li>
        </ul>
      `,
      technologies: ["PyTorch", "Medical Imaging", "Fairness", "Vision-Language Models"],
      metrics: [
        { label: "Bias dimensions assessed", value: "Gender, race, age" },
        { label: "Model signals probed", value: "Vision & decoder confidences" }
      ],
      media: {
        type: "image",
        src: "images/chexagent_audit.png",
        alt: "Medical AI Safety: Demography Bias and Fairness"
      },
      links: []
    },
    {
      id: "drisht-e",
      title: "DRISHT-E: Traffic Analytics Platform",
      subtitle: "IIT Bombay (2021 - Present)",
      summary: "Comprehensive video-based traffic analytics platform tailored for non-lane-based traffic, combining custom datasets, state-of-the-art detection, and real-time analytics.",
      description: `
        <p><strong>DRISHT-E</strong> is a comprehensive video-based traffic analytics platform tailored for non-lane-based traffic. It combines custom datasets, state-of-the-art detection, and real-time analytics to solve complex traffic management challenges in chaotic environments.</p>
        
        <h3>Highlights</h3>
        <ul>
          <li>Curated a drone dataset of ~186k frames with 4M bounding-box annotations.</li>
          <li>Trained multiple object-detection networks delivering state-of-the-art accuracy.</li>
          <li>Focuses on real-time traffic flow analysis and optimization.</li>
        </ul>
      `,
      technologies: ["PyTorch", "OpenCV", "Tracking", "Computer Vision", "Drone Data"],
      metrics: [
        { label: "Drone frames curated", value: "186k" },
        { label: "Annotations captured", value: "4M" },
        { label: "Deployment focus", value: "Real-time traffic flow" }
      ],
      media: {
        type: "image",
        src: "images/Mannanthala_0007_short_compressed.gif",
        alt: "DRISHT-E drone traffic analytics preview"
      },
      links: [
        { label: "View on GitHub", url: "https://github.com/georgevjose/DRISHTE-Public" }
      ]
    },
    {
      id: "dental-landmark",
      title: "Dental Landmark Detection System",
      subtitle: "AIML Internship (2024)",
      summary: "Two-stage PointNet++ pipeline for precise dental landmark localisation on 3D point clouds spanning 420 maxillary casts.",
      description: `
        <p>Developed during a research internship at the Australian Institute for Machine Learning, this project implements a two-stage <strong>PointNet++</strong> pipeline for precise dental landmark localisation on 3D point clouds.</p>
        
        <h3>Results</h3>
        <ul>
          <li>Achieved < 1mm accuracy on 91% of test landmarks.</li>
          <li>Processed dataset spanning 420 maxillary casts.</li>
          <li>Average error reduced to 0.6 mm.</li>
        </ul>
      `,
      technologies: ["Python", "PointNet++", "3D Processing", "Medical AI"],
      metrics: [
        { label: "Average error", value: "0.6 mm" },
        { label: "Landmarks in dataset", value: "504" },
        { label: "Accuracy within 1 mm", value: "91%" }
      ],
      media: {
        type: "image",
        src: "images/T125B(P)Maxillary_result_silver.png",
        alt: "Dental landmark detection heatmap"
      },
      links: [
        { label: "View Report", url: "Dental Landmark Report.pdf" }
      ]
    },
    {
      id: "atmospheric-aerosol-analysis",
      title: "Atmospheric Aerosol Analysis",
      subtitle: "Collaborative Project with IIT Madras",
      summary: "Hygroscopic Properties of Atmospheric Aerosols using QCM",
      description: `
        <p>This project analyzes the hygroscopic properties of atmospheric aerosols using a piezoelectric technique.</p>
        <ul>
          <li>Analysis of measured hygroscopicity data from a high-altitude site to understand the impact of atmospheric pollution on monsoon patterns.</li>
          <li>Created simulations of thermodynamic models and visualizations to compare
aerosol properties with NASA's AOD data</li>
      `,
      technologies: ["Python", "Piezoelectric", "Atmospheric Science"],
      metrics: [],
      media: {
        type: "image",
        src: "images/atmospheric_aod.jpeg",
        alt: "Atmospheric Aerosol Analysis"
      },
      links: [
        { label: "View Publication", url: "https://pubs.acs.org/doi/full/10.1021/acsearthspacechem.3c00347" }
      ]
    }
  ],
  skills: {
    languages: [
      { name: "Python", proficiency: 95 },
      { name: "C++", proficiency: 70 },
      { name: "SQL", proficiency: 80 },
      { name: "MATLAB", proficiency: 60 },
      { name: "R", proficiency: 65 }
    ],
    frameworks: [
      { name: "PyTorch", proficiency: 90 },
      { name: "TensorFlow", proficiency: 85 },
      { name: "OpenCV", proficiency: 85 },
      { name: "scikit-learn", proficiency: 80 },
      { name: "JAX", proficiency: 50 },
      { name: "CUDA", proficiency: 40 },
      { name: "ONNX", proficiency: 60 }
    ],
    tools: [
      { name: "Google Cloud Platform", proficiency: 75 },
      { name: "Git", proficiency: 90 },
      { name: "Docker", proficiency: 70 }
    ],
    specializations: [
      { name: "Computer Vision", proficiency: 90 },
      { name: "Deep Learning", proficiency: 90 },
      { name: "Medical AI", proficiency: 85 },
      { name: "Traffic Analytics", proficiency: 85 },
      { name: "Point Cloud Processing", proficiency: 75 }
    ]
  },
  publications: [
    {
      title: "A deep learning model to automatically identify palatal landmarks on three-dimensional dental casts",
      journal: "International Journal of Dentistry",
      status: "Under Review"
    },
    {
      title: "Complex Hygroscopic Behavior of Ambient Aerosol Particles Revealed by a Piezoelectric Technique",
      journal: "ACS Earth and Space Chemistry",
      status: "Published"
    },
    {
      title: "Automatic Detection and Classification of Vehicle Class in non-lane-based Traffic Conditions Using Drone Data",
      journal: "EASTS 2025 Conference",
      status: "Non-Peer Reviewed"
    }
  ]
};
