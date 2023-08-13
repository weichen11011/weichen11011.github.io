#include<iostream>
#include<vector>
#include<string>
using namespace std;
class Solution {
public:
    int mySqrt(int x) {
        if (x == 0) return x;   
        long int first = 0;
        long int last = x;
        long int mid = 0;
        int ans = 0;
        while (first<=last)
        {
            mid = (first + last)/2;
            if (mid*mid >x ){
                last = mid -1;
            }else if (mid*mid < x){
                first = mid +1;
                ans = mid;
            }else if(mid*mid == x){
                return mid;
        }
    }
    return ans;
    }
};
int main(){
    Solution c;
    int a;
    a = c.mySqrt(2);
    cout << a << endl;
}
