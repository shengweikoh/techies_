import { useState } from 'react';
import styles from './page.module.css'; // Updated to use the correct module import

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Welcome to 'app name'</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
        Login 
        </button>
      </form>
    </div>
  );
}

// // sign in with google 

// import { useState } from 'react';
// import { signIn } from 'next-auth/react';
// import styles from './page.module.css';

// export default function Login() {
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Add your login logic here
//     console.log('Email:', email);
//     console.log('Password:', password);
// };

// return (
//     <div className={styles.container}>
//     <form onSubmit={handleSubmit} className={styles.form}>
//         <h2>Login</h2>
//         <div className={styles.inputGroup}>
//         <label htmlFor="email" className={styles.label}>Email:</label>
//         <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//         />
//         </div>
//         <div className={styles.inputGroup}>
//         <label htmlFor="password" className={styles.label}>Password:</label>
//         <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//         />
//         </div>
//         <button type="submit" className={styles.button}>
//         Login
//         </button>
//     </form>
//     <div className={styles.or}>or</div>
//     <button className={styles.googleButton} onClick={() => signIn('google')}>
//         Sign in with Google
//     </button>
//     </div>
// );
// }

