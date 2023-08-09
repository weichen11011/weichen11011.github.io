#include <iostream>
#include <vector>
#include <string>

using namespace std;
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int high = nums.size();
        int low =0;
        int mid;
        if (target > nums[high-1]){
            return high;
        }
        while(low<=high){
            mid=(low+high)/2;
            if(nums[mid]==target){
                return mid;
            }
            if (nums[mid]<target){
                low = mid+1;
            }
            else{
                high = mid-1;
            }
        }
        return low;
}
};
int main(){
    Solution c;
    int a;
    vector<int> d = {1,3,5,7};
    a = c.searchInsert(d,3);
    cout<<a<<endl;
}
