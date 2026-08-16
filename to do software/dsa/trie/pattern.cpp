#include <bits/stdc++.h> 
using namespace std;

int main(){
    int n=10;
    for(int i=n;i>0;i--){
        for(int j=i;j>0;j--){
            cout<<" ";
        }
        for(int k=0;k<2*n-2*i+1;k++){
            cout<<"*";
        }
        cout<<endl;
    }
    return 0;
}