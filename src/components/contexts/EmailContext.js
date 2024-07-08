


// import React, { createContext, useState } from 'react';

// const EmailContext = createContext();

// const EmailProvider = ({ children }) => {
//   const [email, setEmail] = useState('');

//   return (
//     <EmailContext.Provider value={{ email, setEmail }}>
//       {children}
//     </EmailContext.Provider>
//   );
// };

// export { EmailContext, EmailProvider };



import React, { createContext, useState } from 'react';

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return (
        <EmailContext.Provider value={{ email, setEmail, message, setMessage }}>
            {children}
        </EmailContext.Provider>
    );
};
