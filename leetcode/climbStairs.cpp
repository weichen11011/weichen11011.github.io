# include <iostream>
# include <vector>
# include <string>
# include <cctype>
using namespace std;
class Solution {
public:
    int climbStairs(int n) {
        long long dp[n+1];
        dp[0] = 0;
        dp[1] = 1;
        for (int i=2;i<n+1;i++){
            dp[i] = dp[i-1] + dp[i-2];
        }
        return dp[n];
    }
};
int main(){
    Solution c;
    int ans = c.climbStairs(6);
    cout<<ans<<endl;
}
