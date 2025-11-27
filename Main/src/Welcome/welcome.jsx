// src/Welcome.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import users from "../utils/citizenauth.json";
import "./welcome.css";

const Welcome = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));

            if (user.role === "citizen") navigate("/citizen");
            else if (user.role === "zra") navigate("/zra");
            else if (user.role === "police") navigate("/police");
            else navigate("/");
        } else {
            setError("Invalid email or password. Please try again.");
        }

        setIsLoading(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.02,
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.98 }
    };

    const inputVariants = {
        focus: {
            scale: 1.02,
            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
        }
    };

    return (
        <div className="welcome-container">
            <motion.div
                className="login-card"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <motion.h1
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="logo"
                    >
                        🏛️ GovPortal
                    </motion.h1>
                </motion.div>

                <motion.p variants={itemVariants} className="subtitle">
                    Secure access to government services
                </motion.p>

                <motion.form
                    onSubmit={handleLogin}
                    className="login-form"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <motion.input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            whileFocus="focus"
                            variants={inputVariants}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            whileFocus="focus"
                            variants={inputVariants}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        {error && (
                            <motion.p
                                className="error"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {error}
                            </motion.p>
                        )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.button
                            type="submit"
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            disabled={isLoading}
                            className={isLoading ? "loading" : ""}
                        >
                            {isLoading ? (
                                <motion.div
                                    className="spinner"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                            ) : (
                                "Log In"
                            )}
                        </motion.button>
                    </motion.div>
                </motion.form>

                <motion.div
                    variants={itemVariants}
                    className="hint-section"
                >
                    <p className="hint-title">Demo Credentials</p>
                    <div className="credential-grid">
                        <div className="credential-item">
                            <span className="role-badge citizen">Citizen</span>
                            <span>paul@citizen.com</span>
                            <span>12345</span>
                        </div>
                        <div className="credential-item">
                            <span className="role-badge zra">ZRA</span>
                            <span>admin@zra.gov</span>
                            <span>zra123</span>
                        </div>
                        <div className="credential-item">
                            <span className="role-badge police">Police</span>
                            <span>officer@police.gov</span>
                            <span>police123</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Background animated elements */}
            <div className="background-elements">
                <motion.div
                    className="floating-shape shape-1"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="floating-shape shape-2"
                    animate={{
                        y: [0, 30, 0],
                        rotate: [0, -8, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                <motion.div
                    className="floating-shape shape-3"
                    animate={{
                        y: [0, -25, 0],
                        rotate: [0, 10, 0]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>
        </div>
    );
};

export default Welcome;