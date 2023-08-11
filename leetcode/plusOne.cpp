#include <iostream>
#include <vector>
#include<algorithm>
using namespace std;
class Solution{
public:
    vector<int> plusOne(vector<int>& digits) {
        int len = digits.size();
        int count = 0;
        int plus= 1;
        vector <int> ans2;
        for (int i=(len-1);i>=0;i--){
            int ans = digits[i]+plus;
            digits[i] = ans%10;
            plus = ans/10;
        }
        if (plus>0){
            digits.insert(digits.begin(),plus);
        }
        return digits;
    }
};

int main(){
    Solution c;
    vector<int> a;
    vector<int> d = {1,9,9,9};
    a = c.plusOne(d);
    for (int j=0;j<(a.size());j++){
        cout<<a[j]<<endl;
    }
}
