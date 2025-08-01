document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const aiChatbotModal = document.getElementById('aiChatbotModal');
    const closeButtons = document.querySelectorAll('.modal .close-button');
    const showSignupLink = document.getElementById('showSignup');
    const showLoginLink = document.getElementById('showLogin');
    const aiChatbotToggle = document.getElementById('aiChatbotToggle');

    // Function to show a specific content section
    const showSection = (sectionId) => {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            }
        });

        // Close mobile sidebar if open
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    };

    // Initial load: show dashboard
    showSection('dashboard');

    // Navigation click handler
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            if (sectionId) {
                showSection(sectionId);
            } else if (item.textContent.includes('Settings')) {
                alert('Settings page is under development!');
            }
        });
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Modals functionality
    const openModal = (modal) => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    };

    const closeModal = (modal) => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Open login modal on page load (simulated for first-time user)
    // setTimeout(() => openModal(loginModal), 1000); // Uncomment to show login on load

    // Close buttons for modals
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            closeModal(e.target.closest('.modal'));
        });
    });

    // Click outside modal to close
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) closeModal(loginModal);
        if (event.target === signupModal) closeModal(signupModal);
        if (event.target === aiChatbotModal) closeModal(aiChatbotModal);
    });

    // Switch between login and signup modals
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(signupModal);
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signupModal);
        openModal(loginModal);
    });

    // Simulate Auth (Login/Signup)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            console.log('Login Attempt:', { email, password });
            alert('Login simulated! In a real app, this would send credentials to a backend for JWT authentication.');
            closeModal(loginModal);
            // In a real app, on successful login, you'd get a JWT and store it.
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('signupUsername').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            console.log('Signup Attempt:', { username, email, password });
            alert('Signup simulated! In a real app, this would register the user and issue a JWT.');
            closeModal(signupModal);
            // In a real app, on successful signup, you'd get a JWT and store it.
        });
    }

    // Real-Time Chat Simulation
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const toggleIdentityBtn = document.querySelector('.toggle-identity-btn');
    let isAnonymous = true;

    if (sendMessageBtn) {
        const addMessage = (sender, content, isSent = false) => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            if (isSent) {
                messageDiv.classList.add('sent');
            } else {
                messageDiv.classList.add('received');
            }

            const senderSpan = document.createElement('span');
            senderSpan.classList.add('sender');
            senderSpan.textContent = sender;

            const contentP = document.createElement('p');
            contentP.textContent = content;

            const timestampSpan = document.createElement('span');
            timestampSpan.classList.add('timestamp');
            timestampSpan.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            messageDiv.appendChild(senderSpan);
            messageDiv.appendChild(contentP);
            messageDiv.appendChild(timestampSpan);

            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
        };

        sendMessageBtn.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                const senderName = isAnonymous ? 'You (Anonymous)' : 'You (Alex Johnson)';
                addMessage(senderName, message, true);
                chatInput.value = '';

                // Simulate AI moderation or response
                if (message.toLowerCase().includes('deepseek ai')) {
                    setTimeout(() => {
                        addMessage('DeepSeek AI', 'I am here to help! How can I assist you further with your studies or platform navigation?');
                    }, 1500);
                } else if (message.toLowerCase().includes('report')) {
                    setTimeout(() => {
                        addMessage('DeepSeek AI', 'Thank you for reporting. Our AI moderation system is reviewing the content.');
                    }, 1500);
                } else if (Math.random() < 0.3) { // Simulate occasional random replies
                    setTimeout(() => {
                        const replies = [
                            "That's interesting!",
                            "I agree!",
                            "Good point.",
                            "Thanks for sharing!"
                        ];
                        addMessage('Anonymous User ' + Math.floor(Math.random() * 100), replies[Math.floor(Math.random() * replies.length)]);
                    }, 2000);
                }
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessageBtn.click();
            }
        });

        toggleIdentityBtn.addEventListener('click', () => {
            isAnonymous = !isAnonymous;
            toggleIdentityBtn.innerHTML = isAnonymous ? '<i class="fas fa-user-secret"></i> Anonymous' : '<i class="fas fa-user"></i> Alex Johnson';
            toggleIdentityBtn.classList.toggle('active', !isAnonymous);
            alert(`You are now ${isAnonymous ? 'anonymous' : 'identified'}.`);
        });

        // Simulate incoming messages
        setInterval(() => {
            if (document.getElementById('chat').classList.contains('active')) {
                const randomMessages = [
                    "Anyone else struggling with the latest CS assignment?",
                    "Just found a great study spot in the library!",
                    "What's everyone doing this weekend?",
                    "Heard about the new club fair next month?",
                    "Need recommendations for a good coffee shop near campus."
                ];
                if (Math.random() < 0.5) { // 50% chance to receive a message
                    addMessage('Anonymous User ' + Math.floor(Math.random() * 100), randomMessages[Math.floor(Math.random() * randomMessages.length)]);
                }
            }
        }, 10000); // Every 10 seconds
    }

    // AI Chatbot Integration (DeepSeek AI)
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendChatbotMessageBtn = document.getElementById('sendChatbotMessageBtn');

    aiChatbotToggle.addEventListener('click', () => {
        openModal(aiChatbotModal);
    });

    if (sendChatbotMessageBtn) {
        const addChatbotMessage = (sender, content, isSent = false) => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            if (isSent) {
                messageDiv.classList.add('sent');
            } else {
                messageDiv.classList.add('received');
            }

            const senderSpan = document.createElement('span');
            senderSpan.classList.add('sender');
            senderSpan.textContent = sender;

            const contentP = document.createElement('p');
            contentP.textContent = content;

            messageDiv.appendChild(senderSpan);
            messageDiv.appendChild(contentP);

            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        };

        sendChatbotMessageBtn.addEventListener('click', () => {
            const message = chatbotInput.value.trim();
            if (message) {
                addChatbotMessage('You', message, true);
                chatbotInput.value = '';

                // Simulate DeepSeek AI response
                setTimeout(() => {
                    let aiResponse = "I'm sorry, I don't have enough information to answer that. Please try rephrasing your question.";
                    if (message.toLowerCase().includes('study')) {
                        aiResponse = "For study materials, check the 'Study Material Sharing' section within your Class Groups. You can also find study groups in the 'Hangouts' section!";
                    } else if (message.toLowerCase().includes('job')) {
                        aiResponse = "Looking for jobs? Head over to the 'Job Board' where you can find AI-matched listings, resume reviews, and mock interviews!";
                    } else if (message.toLowerCase().includes('club')) {
                        aiResponse = "Interested in clubs? Visit the 'Clubs' section to discover interest-based communities or even create your own!";
                    } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
                        aiResponse = "Hello there! How can I assist you today?";
                    } else if (message.toLowerCase().includes('moderation')) {
                        aiResponse = "Our platform uses DeepSeek AI for content moderation to ensure a safe and respectful environment for everyone.";
                    } else if (message.toLowerCase().includes('recommendations')) {
                        aiResponse = "I provide smart recommendations for jobs, clubs, and study groups based on your profile and activity. Check your dashboard!";
                    }
                    addChatbotMessage('DeepSeek AI', aiResponse);
                }, 1500);
            }
        });

        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatbotMessageBtn.click();
            }
        });
    }

    // Simulate Create Club button
    const createClubBtn = document.querySelector('.create-club-btn');
    if (createClubBtn) {
        createClubBtn.addEventListener('click', () => {
            alert('Simulating "Create New Club" form. In a real app, this would open a form to submit club details.');
        });
    }

    // Simulate Create New Room button
    const createRoomBtn = document.querySelector('.create-room-btn');
    if (createRoomBtn) {
        createRoomBtn.addEventListener('click', () => {
            alert('Simulating "Create New Hangout Room" form. You would configure voice/video, purpose, and invite members.');
        });
    }

    // Simulate AI Career Tools buttons
    document.querySelectorAll('.ai-tools .btn').forEach(button => {
        button.addEventListener('click', () => {
            const tool = button.textContent.trim();
            alert(`Simulating "${tool}". This would integrate with DeepSeek AI for advanced career assistance.`);
        });
    });
});