import { useAuth } from '../context/AuthContext';
import { ROLE_PERMISSIONS } from '../config/permissions';
import { ROLES } from '../config/roles';

export const usePermission = () => {
  const { user } = useAuth();

  const hasPermission = (permission) => {
    if (!user || !user.role) return false;
    
    // Admin has all permissions
    if (user.role === ROLES.ADMIN) return true;

    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return userPermissions.includes(permission) || userPermissions.includes('*');
  };

  const hasRole = (roles) => {
    if (!user || !user.role) return false;
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    return user.role === roles;
  };

  return { hasPermission, hasRole };
};
