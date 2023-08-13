# include <iostream>
# include <vector>
# include <string>
# include <cctype>
using namespace std;
class Solution {
public:
    string addBinary(string a, string b) {
        int lena = a.size();
        int lenb = b.size();
        if (lena < lenb){
            swap(a, b);
        }
        while(b.size() < a.size()){
            b = "0" + b;
        }
        int carry = 0;
        string ans ="";
        for (int i=(a.size()-1);i>=0;i--){
            if (a[i] == '1' && b[i] == '1'){
                if (carry ==0){
                    ans = "0" + ans;
                }
                else{
                    ans = "1" + ans;
                }
                carry = 1;
            }
            else if (a[i] == '0' && b[i] == '1'){
                if (carry ==0){
                    ans = "1" + ans;
                }
                else{
                    ans = "0" + ans;
                    carry = 1;
                }
            }
            else if (a[i] == '1' && b[i] == '0'){
                if (carry ==0){
                    ans = "1" + ans;
                }
                else{
                    ans = "0" + ans;
                    carry = 1;
                }
            }else{
                if (carry ==0){
                    ans = "0" + ans;
                }
                else{
                    ans = "1" + ans;
                    carry = 0;
                }
            }
        }
        if(carry == 1) ans = "1" + ans;
        
        return ans;
    }
};

int main(){
    string final;
    Solution c;
    final = c.addBinary("1","111");
    cout << final << endl;
}
