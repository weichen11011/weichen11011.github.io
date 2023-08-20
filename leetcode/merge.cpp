#include <iostream>
#include <vector>
using namespace std;
class Solution{
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int count = 0;
        for(int i =m;i<m+n;i++){
            nums1[i] = nums2[count];
            count+=1;
        }
        sort(nums1.begin(),nums1.end());
}
};

int main(){
    Solution c;
    vector<int> q;
    vector<int> w ={1,2,3,0,0,0};
    vector<int> r ={2,5,6};
    q = c.merge(w,3,r,3);
    for (int j=0;j<(q.size());j++){
        cout<<q[j]<<endl;
    }
}

class Solution{
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        nums1.erase(nums1.begin()+m,nums1.end());
        int count = 0;
        for(int i = 0; i<n; i++){
            nums1.push_back(nums2[i]);
        }
        sort(nums1.begin(),nums1.end());
}
};
