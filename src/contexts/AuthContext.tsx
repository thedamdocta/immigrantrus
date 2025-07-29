import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  picture?: string;
  createdAt: string;
  authMethod: 'google' | 'manual';
}

interface AuthContextType {
  user: User | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  signIn: (userData: Omit<User, 'id' | 'createdAt'>) => void;
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// For compatibility with existing Clerk-based components
export const useUser = () => {
  const { user, isLoaded } = useAuth();
  return { user, isLoaded };
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load user from localStorage on app start
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('auth_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('auth_user');
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const signIn = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    
    console.log('✅ User signed in:', newUser.email);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    
    // Also clear any OAuth session data
    sessionStorage.removeItem('oauth_user_data');
    sessionStorage.removeItem('oauth_state');
    
    console.log('✅ User signed out');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    
    console.log('✅ User updated:', updatedUser.email);
  };

  const value: AuthContextType = {
    user,
    isLoaded,
    isSignedIn: !!user,
    signIn,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
