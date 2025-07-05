import * as React from 'react';
import { 
  Button, 
  TextField, 
  Link, 
  Alert, 
  IconButton, 
  Divider, 
  Typography, 
  Box, 
  CircularProgress,
  Checkbox
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useAuth } from '../dashboard/auth-context';

const primaryColor = '#6366f1';
const secondaryColor = '#10b981';
const cardBg = 'rgba(255, 255, 255, 0.96)';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 120 
    }
  }
};

export default function ModernLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [socialLoading, setSocialLoading] = React.useState({ google: false, facebook: false });

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/signin', {
        email,
        password
      });

      const { token, userId, email: userEmail, username, name, avatar } = response.data;
      
      login(token, {
        userId,
        email: userEmail,
        username,
        name,
        avatar
      }, rememberMe);

      navigate('/dashboard');
      
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: any, type: 'google' | 'facebook') => {
    const auth = getAuth(app);
    auth.settings.appVerificationDisabledForTesting = true; // Add this line
    
    setSocialLoading({ ...socialLoading, [type]: true });
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userData = {
        userId: user.uid,
        email: user.email || '',
        name: user.displayName || '',
        username: user.email?.split('@')[0] || '',
        avatar: user.photoURL || ''
      };
      
      // Get the Firebase token
      const token = await user.getIdToken();
      
      // Login to your own backend
      const response = await axios.post('http://localhost:5000/api/social-login', {
        token,
        userData
      });
      
      // Use your auth context
      login(response.data.token, userData, true);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Social login error:', error);
      setError(`Login failed: ${error.message}`);
    } finally {
      setSocialLoading({ ...socialLoading, [type]: false });
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
        p: 2,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ 
          width: '100%', 
          maxWidth: '450px',
          margin: 'auto'
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            backgroundColor: cardBg,
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(12px)',
            position: 'relative'
          }}
        >
          <Box sx={{ 
            height: '6px', 
            background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
          }} />
          
          <Box sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div variants={itemVariants}>
                <Box sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                }}>
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  }}>
                    <AccountCircle fontSize="large" />
                  </Box>
                </Box>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${primaryColor}, #4f46e5)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    mb: 1
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ color: '#64748b' }}>
                  Sign in to continue to your account
                </Typography>
              </motion.div>
            </Box>
            
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                    {error}
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
            
            <form onSubmit={handleEmailLogin}>
              <motion.div variants={itemVariants}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="medium"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ color: '#94a3b8', mr: 1 }}>
                        <AccountCircle />
                      </Box>
                    ),
                  }}
                  variant="outlined"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="medium"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#94a3b8' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                  variant="outlined"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                      name="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      value="true"
                      color="primary"
                      size="small"
                      sx={{ 
                        color: primaryColor,
                        '&.Mui-checked': {
                          color: primaryColor,
                        },
                      }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      Remember me
                    </Typography>
                  </Box>
                  <Link 
                    href="/forgot-password" 
                    sx={{ 
                      fontWeight: 500, 
                      color: primaryColor,
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    background: `linear-gradient(135deg, ${primaryColor}, #4f46e5)`,
                    borderRadius: '12px',
                    mb: 2
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>
              </motion.div>
            </form>
            
            <motion.div variants={itemVariants}>
              <Divider sx={{ my: 3, color: '#e2e8f0' }}>
                <Typography variant="body2" color="textSecondary" sx={{ color: '#64748b', px: 2 }}>
                  Or continue with
                </Typography>
              </Divider>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              style={{ display: 'flex', gap: '16px' }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ flex: 1 }}
              >
                <Button
                  variant="outlined"
                  startIcon={socialLoading.google ? <CircularProgress size={20} /> : <GoogleIcon />}
                  onClick={() => handleSocialLogin(new GoogleAuthProvider(), 'google')}
                  disabled={socialLoading.google}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    borderColor: '#e2e8f0',
                    color: '#334155',
                    backgroundColor: 'white',
                    '&:hover': {
                      borderColor: '#cbd5e1',
                      backgroundColor: '#f8fafc',
                    }
                  }}
                >
                  Google
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ flex: 1 }}
              >
                <Button
                  variant="outlined"
                  startIcon={socialLoading.facebook ? <CircularProgress size={20} /> : <FacebookIcon />}
                  onClick={() => handleSocialLogin(new FacebookAuthProvider(), 'facebook')}
                  disabled={socialLoading.facebook}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    borderColor: '#e2e8f0',
                    color: '#334155',
                    backgroundColor: 'white',
                    '&:hover': {
                      borderColor: '#cbd5e1',
                      backgroundColor: '#f8fafc',
                    }
                  }}
                >
                  Facebook
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              style={{ textAlign: 'center', marginTop: '32px' }}
            >
              <Typography variant="body2" color="textSecondary">
                Don't have an account?{' '}
                <Link 
                  href="/signup" 
                  sx={{ 
                    fontWeight: 600, 
                    color: primaryColor,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </motion.div>
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  );
}