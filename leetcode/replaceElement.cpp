#include <iostream>
#include <vector>
#include <string>

using namespace std;
class Solution{
    public:
        int removeElement(vector<int>& nums, int val) {
        int count = 0;
        int len = nums.size();
        for (int i=1;i<=len;i++){
            if (val != nums[count]){
                nums[count] = nums[i];
                count++;
            }
        }
        return count;
    }
};
int main(){
    Solution c;
    int ans;
    vector<int> d = {3,2,2,3};
    ans = c.removeElement(d,3);
    cout<<ans<<endl;
}
