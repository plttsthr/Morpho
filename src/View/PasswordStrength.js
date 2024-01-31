import React, { useState } from 'react';

function PasswordStrength() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);

  const checkPasswordStrength = (value) => {
    // You can use a password strength library like zxcvbn here for more accurate results.
    // For simplicity, this example uses a basic algorithm to determine strength.
    if (value.length < 6) {
      return 1;
    }
    if (value.length < 8) {
      return 2;
    }
    if (/[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value)) {
      return 4;
    }
    return 3;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const newStrength = checkPasswordStrength(newPassword);
    setStrength(newStrength);
  };

  return (
    <div className="password-strength">
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={handlePasswordChange}
      />
      <div className="strength-meter">
        <div
          className={`strength-bar strength-${strength}`}
          style={{ width: `${(strength / 4) * 100}%` }}
        ></div>
      </div>
      
    </div>
  );
}

export default PasswordStrength;
