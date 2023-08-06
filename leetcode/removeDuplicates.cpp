#include <iostream>
#include <vector>
#include <string>

using namespace std;
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int len = nums.size();
        int count = 0;
        for (int i = 1; i<len; i++){
            if (nums[i] != nums[count]){
                count++;
                nums[count] = nums[i];
            }
        }
        return count+1;
    }
};
int main(){
    Solution c;
    int ans;
    vector<int> d = {1,1,2};
    ans = c.removeDuplicates(d);
    cout<<ans<<endl;

}
