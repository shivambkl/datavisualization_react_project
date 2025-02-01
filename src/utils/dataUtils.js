import calls from '../data/calls.json';
import emails from '../data/emails.json';
import accounts from '../data/accounts.json';
import users from '../data/users.json';

/**
 * Merges users, accounts, calls, and emails data.
 * @returns {Array} Array of merged user data.
 */
export const mergeData = () => {
    return users.map(user => {
        // Find all accounts in the same territory as the user
        const userAccounts = accounts.filter(account => account.territory === user.territory);

        // Merge calls and emails for each account
        const accountsWithDetails = userAccounts.map(account => ({
            ...account,
            calls: calls.filter(call => call.accountId === account.id),
            emails: emails.filter(email => email.accountId === account.id),
        }));

        // Return the user with their detailed accounts
        return {
            ...user,
            accounts: accountsWithDetails,
        };
        
    });
};
