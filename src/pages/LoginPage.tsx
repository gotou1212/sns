import { useState } from "react";
import { Link, useNavigate } from "react-router";

const API_BASE_URL = "http://localhost:3000";

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!username.trim() || !password.trim()) {
            setError("ユーザー名とパスワードを入力してください。");
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username.trim(), password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data?.error ?? "ログインに失敗しました。");
                return;
            }

            localStorage.setItem("token", data.token);
            navigate("/");
        } catch {
            setError("サーバーに接続できませんでした。時間をおいて再度お試しください。");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                background:
                    "radial-gradient(circle at 20% 10%, #fef6d8 0%, #fff 45%, #eaf7ff 100%)",
                padding: "24px",
            }}
        >
            <section
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e9e9e9",
                    borderRadius: "16px",
                    boxShadow: "0 20px 50px rgba(20, 33, 61, 0.12)",
                    padding: "28px",
                }}
            >
                <h1 style={{ margin: "0 0 8px 0", fontSize: "28px" }}>ログイン</h1>
                <p style={{ margin: "0 0 20px 0", color: "#555" }}>
                    アカウント情報を入力してください。
                </p>

                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
                    <label style={{ display: "grid", gap: "6px" }}>
                        <span>ユーザー名</span>
                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            placeholder="username"
                            autoComplete="username"
                            style={{
                                border: "1px solid #cfd6e4",
                                borderRadius: "10px",
                                padding: "10px 12px",
                                fontSize: "15px",
                            }}
                        />
                    </label>

                    <label style={{ display: "grid", gap: "6px" }}>
                        <span>パスワード</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="password"
                            autoComplete="current-password"
                            style={{
                                border: "1px solid #cfd6e4",
                                borderRadius: "10px",
                                padding: "10px 12px",
                                fontSize: "15px",
                            }}
                        />
                    </label>

                    {error ? (
                        <p
                            role="alert"
                            style={{
                                margin: 0,
                                color: "#b00020",
                                background: "#ffe9ee",
                                borderRadius: "8px",
                                padding: "10px 12px",
                                border: "1px solid #ffc8d5",
                            }}
                        >
                            {error}
                        </p>
                    ) : null}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            border: "none",
                            borderRadius: "12px",
                            padding: "12px 14px",
                            fontSize: "15px",
                            color: "#fff",
                            background: isSubmitting ? "#8095b2" : "#2458e8",
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                        }}
                    >
                        {isSubmitting ? "送信中..." : "ログイン"}
                    </button>
                </form>

                <p style={{ margin: "16px 0 0 0" }}>
                    アカウントがない場合は <Link to="/signup">新規登録</Link>.  
                </p>
            </section>
        </main>
    );
};

export default LoginPage;
